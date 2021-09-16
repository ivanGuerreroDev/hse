import { floor } from 'lodash';
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
import { RootState, store } from 'state/store/store';
import { IDocumento, IResource } from 'types/formulariodinamico';
import { isNetworkAllowed } from './network';
import { stateMonitor } from './stateMonitor';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Upload, { UploadOptions } from 'react-native-background-upload';
import Config from 'react-native-config';
import { saveDocumento, saveResource } from 'state/formulariodinamico/actions';

export const createPendingTask = (documento: IDocumento): void => {
  const state: RootState = store.getState();

  const existingPendingTask = state.pendingManager.pendingTasks
    .filter(item => item.documentoId === documento._id);

  if (existingPendingTask.length === 0) {
    const createdResources: IResource[] = documento.resources
      ?.filter(resource => resource.type === 'object') || [];

    let pendingTask: IPendingTask = {
      documentoId: documento._id,
      pendingResourcesUri: createdResources.map(resource => resource.url)
    };

    store.dispatch(addPendingTask(pendingTask));
  } else
    store.dispatch(deletePendingTask(documento._id));
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
  const state: RootState = store.getState();
  if (isNetworkAllowed() && !state.sendingManager.isSending && state.pendingManager.pendingTasks.length > 0) {
    store.dispatch(startSending());

    state.pendingManager.pendingTasks.forEach(pendingTask => {
      store.dispatch(addSendingTask({ documentoId: pendingTask.documentoId, totalResources: 1}));

      pendingTask.pendingResourcesUri.forEach(pendingResource => {
        store.dispatch(addSendingResource(pendingTask.documentoId));

        uploadResource(pendingTask.documentoId, pendingResource);
      });

      store.dispatch(deleteSendingResource(pendingTask.documentoId));
    });
  }
};

const uploadResource = async (documentoId: string, resourceUri: string): Promise<void> => {
  const state: RootState = store.getState();
  try {
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: Config.S3_AWS_ACCESS_KEY_ID,
        secretAccessKey: Config.S3_AWS_SECRET_ACCESS_KEY
      },
      region: 'us-east-2'
    });

    const splittedPath = (resourceUri as string).split('/');
    const filename = splittedPath[splittedPath.length -1];

    const command = new PutObjectCommand({
      Bucket: 'hse-app',
      Key: `formularios/${documentoId}/${filename}`,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {expiresIn: 1800});

    const options: UploadOptions = {
      url: signedUrl,
      path: resourceUri.replace('file:', ''),
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
      console.warn(data.error);
      store.dispatch(deleteSendingResource(documentoId));
    });
    Upload.addListener('completed', uploadId, () => {
      const newResourceUri = `https://hse-app.s3.us-east-2.amazonaws.com/formularios/${documentoId}/${filename}`;
      const documento: IDocumento = state.documentos.documentos
        .filter(documento => documento._id === documentoId)[0];
      const resource = (documento.resources || [])
        .find(resource => resource.url === resourceUri);

      store.dispatch(saveResource({
        url: newResourceUri,
        type: 'object',
        localData: resourceUri
      }));

      if (resource) {
        store.dispatch(saveDocumento({
          ...documento,
          resources: [
            ...(documento.resources?.filter(resource => resource.url !== resourceUri && resource.url !== newResourceUri) || []),
            {
              name: resource.name,
              url: newResourceUri,
              type: 'object'
            }
          ]
        }));
      }

      store.dispatch(deletePendingResource(documentoId, resourceUri));
      store.dispatch(deleteSendingResource(documentoId));
    });
  } catch (error) {
    console.warn(error);
    store.dispatch(deleteSendingResource(documentoId));
  }
};

const uploadDocumento = (documentoId: string): void => {
  console.log(`${documentoId}: enviando documento (deleteSendingResource)`);
  store.dispatch(deleteSendingResource(documentoId));

  setTimeout(() => {
    console.log(`${documentoId}: limpiando documento (deleteSendingTask)`);
    store.dispatch(deleteSendingTask(documentoId));
  }, floor((Math.random() * 10000)));
};
