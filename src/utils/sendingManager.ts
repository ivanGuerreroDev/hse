import {
  addPendingTask,
  addSendingResource,
  addSendingTask,
  deletePendingResource,
  deletePendingTask,
  deleteSendingResource,
  deleteSendingTask,
  startSending,
  stopSending
} from 'state/sendingManager/actions';
import { IPendingTask, ISendingTask } from 'state/sendingManager/types';
import { changeStatusDocumento, saveDocumento, saveResource } from 'state/formulariodinamico/actions';
import { RootState, store } from 'state/store/store';
import { DocumentoStatus, IDocumento, IResource } from 'types/formulariodinamico';
import { isNetworkAllowed } from './network';
import { stateMonitor } from './stateMonitor';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Upload, { UploadOptions } from 'react-native-background-upload';
import axios from 'axios';
import Config from 'react-native-config';
import { Platform } from 'react-native';
import { formatRFC3339 } from 'date-fns';
import { getCredentials } from 'utils';
import ImageResizer from 'react-native-image-resizer';


export const createPendingTask = (documento: IDocumento): void => {
  const checkResourceIsInUse = (resource: IResource): boolean => {
    return JSON.stringify(documento).includes(
      `resource('${resource.name}')`
    );
  };

  store.dispatch(saveDocumento({
    ...documento,
    resources: [
      ...(documento.resources
        ?.filter(resource =>
          resource.type !== 'object' || checkResourceIsInUse(resource)
        ) || [])
    ]
  }));

  documento = store.getState().documentos.documentos
    .find(item => item._id === documento._id) || documento;

  const existingPendingTask = store.getState().pendingManager.pendingTasks
    .filter(item => item.documentoId === documento._id);

  if (existingPendingTask.length === 0) {
    const createdResources: IResource[] = documento.resources
      ?.filter(resource => resource.type === 'object') || [];

    let pendingTask: IPendingTask = {
      documentoId: documento._id,
      pendingResourcesUri: createdResources.map(resource => resource.url)
    };

    store.dispatch(addPendingTask(pendingTask));
  }
}

stateMonitor(store, 'netInfoState', () => startSendingManager());
stateMonitor(store, 'pendingManager', () => startSendingManager());
stateMonitor(store, 'sendingManager.isSending', (newValue: boolean) => {
  if (!newValue)
    startSending();
});
stateMonitor(store, 'sendingManager.sendingTasks', (newValue: ISendingTask[], oldValue: ISendingTask[]) => {
  oldValue.forEach((oldSendingTask) => {
    let newSendingTask = newValue.filter((newSendingTask) => newSendingTask.documentoId === oldSendingTask.documentoId);
    if (newSendingTask.length === 1 && newSendingTask[0].totalResources === 0)
      uploadDocumento(newSendingTask[0].documentoId);
  });

  if (newValue.length === 0) {
    store.dispatch(stopSending());
  }
});

const startSendingManager = (): void => {
  if (isNetworkAllowed() && !store.getState().sendingManager.isSending && store.getState().pendingManager.pendingTasks.length > 0) {
    store.dispatch(startSending());

    store.getState().pendingManager.pendingTasks.forEach(pendingTask => {
      store.dispatch(addSendingTask({ documentoId: pendingTask.documentoId, totalResources: 1}));

      pendingTask.pendingResourcesUri.forEach(pendingResource => {
        store.dispatch(addSendingResource(pendingTask.documentoId));

        ImageResizer.createResizedImage(pendingResource, 600, 500, 'JPEG', 100, 0, undefined, false, {  mode: 'contain', onlyScaleDown: false })
          .then(resizedImage => {
            uploadResource(pendingTask.documentoId, resizedImage.uri, pendingResource )
          }) .catch(err => {
              console.error(err);
          });
      });

      store.dispatch(deleteSendingResource(pendingTask.documentoId));
    });
  }
};

const uploadResource = async (documentoId: string, resizeResourceUri: string, oldResourceUri: string): Promise<void> => {

  try {

    const data = await getCredentials()
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: data.s3?.S3_AWS_ACCESS_KEY_ID,
        secretAccessKey: data.s3?.S3_AWS_SECRET_ACCESS_KEY
      },
      region: 'us-east-2'
    });

    const splittedPath = (resizeResourceUri as string).split('/');
    const filename = splittedPath[splittedPath.length -1];

    const command = new PutObjectCommand({
      Bucket: 'hse-app',
      Key: `formularios/${documentoId}/${filename}`,
      ACL: 'public-read'
    });

    const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 1800});

    const options: UploadOptions = {
      url: signedUrl,
      path: fixPath(resizeResourceUri),
      method: 'PUT',
      type: 'raw',
      headers: {
        'content-type': 'application/octet-stream'
      },
      notification: {
        autoClear: true
      }
    };

    const uploadId: string = await Upload.startUpload(options);

    Upload.addListener('error', uploadId, (data) => {
      console.error(data.error);
      store.dispatch(deleteSendingResource(documentoId));
    });

    Upload.addListener('completed', uploadId, () => {
      const newResourceUri = `https://hse-app.s3.us-east-2.amazonaws.com/formularios/${documentoId}/${filename}`;
      const documento: IDocumento = store.getState().documentos.documentos
        .filter(documento => documento._id === documentoId)[0];

      const resource = (documento.resources || []).find(resource => resource.url === oldResourceUri);

      store.dispatch(saveResource({
        url: newResourceUri,
        type: 'object',
        localData: oldResourceUri
      }));

      if (resource) {
        store.dispatch(saveDocumento({
          ...documento,
          resources: [
            ...(documento.resources?.filter(resource => resource.url !== oldResourceUri && resource.url !== newResourceUri) || []),
            {
              name: resource.name,
              url: newResourceUri,
              type: 'object'
            }
          ]
        }));
      }

      store.dispatch(deletePendingResource(documentoId, oldResourceUri));
      store.dispatch(deleteSendingResource(documentoId));
    });
  } catch (error) {
    console.error(error);
    store.dispatch(deleteSendingResource(documentoId));
  }
};

const uploadDocumento = async (documentoId: string): Promise<void> => {
  store.dispatch(deleteSendingResource(documentoId));

  try {
    const documento: IDocumento = {
      ...store.getState().documentos.documentos
        .filter(documento => documento._id === documentoId)[0],
      sentDate: {
        $date: formatRFC3339(new Date(), {fractionDigits: 3})
      }
    };
    store.dispatch(saveDocumento(documento));

    const response = await axios.post(`${Config.UrlFormularios}/documentos`, documento);

    store.dispatch(deletePendingTask(documentoId));
    store.dispatch(changeStatusDocumento(documentoId, DocumentoStatus.sent));
    console.debug(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    store.dispatch(deleteSendingTask(documentoId));
  }
};

const fixPath = (path: string): string => {
  if (Platform.OS === 'android')
   return (/^(file:\/*){1}(\/.*){1}$/.exec(path) || ['','',path])[2]
  else
    return path;
};
