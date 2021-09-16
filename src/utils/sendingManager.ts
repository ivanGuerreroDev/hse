import { floor } from 'lodash';
import {
  addPendingTask,
  addSendingResource,
  addSendingTask,
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
    console.log(`Deteniendo motor de envío (stopSending)`);
    store.dispatch(stopSending());
  }
});

const startSendingManager = (): void => {
  const state: RootState = store.getState();
  if (isNetworkAllowed() && !state.sendingManager.isSending && state.pendingManager.pendingTasks.length > 0) {
    console.log('Iniciando motor de envío (startSending)');
    store.dispatch(startSending());

    state.pendingManager.pendingTasks.forEach(pendingTask => {
      console.log(`${pendingTask.documentoId}: Iniciando envío de recursos. (addSendingTask)`);
      store.dispatch(addSendingTask({ documentoId: pendingTask.documentoId, totalResources: 1}));

      pendingTask.pendingResourcesUri.forEach(pendingResource => {
        console.log(`${pendingTask.documentoId}: enviando recurso "${pendingResource}" (addSendingResource)`);
        store.dispatch(addSendingResource(pendingTask.documentoId));

        uploadResource(pendingTask.documentoId, pendingResource);
      });

      console.log(`${pendingTask.documentoId}: recursos procesados (deleteSendingResource)`);
      store.dispatch(deleteSendingResource(pendingTask.documentoId));
    });
  }
};

const uploadResource = (documentoId: string, resourceUri: string): void => {
  setTimeout(() => {
    console.log(`${documentoId}: limpiando recurso "${resourceUri}" (deleteSendingResource)`);
    store.dispatch(deleteSendingResource(documentoId));
  }, floor((Math.random() * 10000)));
};

const uploadDocumento = (documentoId: string): void => {
  console.log(`${documentoId}: enviando documento (deleteSendingResource)`);
  store.dispatch(deleteSendingResource(documentoId));

  setTimeout(() => {
    console.log(`${documentoId}: limpiando documento (deleteSendingTask)`);
    store.dispatch(deleteSendingTask(documentoId));
  }, floor((Math.random() * 10000)));
};
