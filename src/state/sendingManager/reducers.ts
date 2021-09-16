import {
  AddPendingTaskAction,
  AddSendingResourceAction,
  AddSendingTaskAction,
  DeletePendingResourceAction,
  DeletePendingTaskAction,
  DeleteSendingResourceAction,
  DeleteSendingTaskAction,
  PendingManagerAction,
  PendingManagerState,
  PENDINGMANAGER_ACTIONS,
  SendingManagerAction,
  SendingManagerState,
  SENDINGMANAGER_ACTIONS
} from './types'

const initialPendingManagerState: PendingManagerState = {
  pendingTasks: []
};

export const pendingManagerReducer = (
  state: PendingManagerState = initialPendingManagerState,
  action: PendingManagerAction
): PendingManagerState => {
  switch (action.type) {
    case PENDINGMANAGER_ACTIONS.ADDPENDINGTASK_PENDINGMANAGER: {
      let { pendingTask } = (action as AddPendingTaskAction).payload;

      return {
        pendingTasks: [
          ...state.pendingTasks
            .filter(item => item.documentoId !== pendingTask.documentoId),
          pendingTask
        ]
      };
    }

    case PENDINGMANAGER_ACTIONS.DELETEPENDINGTASK_PENDINGMANAGER: {
      let { documentoId } = (action as DeletePendingTaskAction).payload;

      return {
        pendingTasks: [
          ...state.pendingTasks
            .filter(item => item.documentoId !== documentoId)
        ]
      };
    }

    case PENDINGMANAGER_ACTIONS.DELETEPENDINGRESOURCE_PENDINGMANAGER: {
      let { documentoId, resourceUri } = (action as DeletePendingResourceAction).payload;

      return {
        pendingTasks: [
          ...state.pendingTasks
            .filter(item => item.documentoId !== documentoId),
          ...state.pendingTasks
            .filter(item => item.documentoId === documentoId)
            .map(item => {
              return {
                ...item,
                pendingResourcesUri: [
                  ...item.pendingResourcesUri
                    .filter(resource => resource !== resourceUri)
                ]
              };
            })
        ]
      }
    }

    default: return state;
  }
};

const initialSendingManagerState: SendingManagerState = {
  isSending: false,
  sendingTasks: [],
}

export const sendingManagerReducer = (
  state: SendingManagerState = initialSendingManagerState,
  action: SendingManagerAction
): SendingManagerState => {
  switch (action.type) {
    case SENDINGMANAGER_ACTIONS.STARTSENDING_SENDINGMANAGER: {
      return {
        ...state,
        isSending: true
      };
    }

    case SENDINGMANAGER_ACTIONS.STOPSENDING_SENDINGMANAGER: {
      return {
        ...state,
        isSending: false
      };
    }

    case SENDINGMANAGER_ACTIONS.ADDSENDINGTASK_SENDINGMANAGER: {
      let { sendingTask } = (action as AddSendingTaskAction).payload;

      return {
        ...state,
        sendingTasks: [
          ...state.sendingTasks
            .filter(item => item.documentoId !== sendingTask.documentoId),
          sendingTask
        ]
      };
    }

    case SENDINGMANAGER_ACTIONS.DELETESENDINGTASK_SENDINGMANAGER: {
      let { documentoId } = (action as DeleteSendingTaskAction).payload;

      return {
        ...state,
        sendingTasks: [
          ...state.sendingTasks
            .filter(item => item.documentoId !== documentoId)
        ]
      };
    }

    case SENDINGMANAGER_ACTIONS.ADDSENDINGRESOURCE_SENDINGMANAGER: {
      let { documentoId } = (action as AddSendingResourceAction).payload;

      return {
        ...state,
        sendingTasks: [
          ...state.sendingTasks
            .filter(item => item.documentoId !== documentoId),
          ...state.sendingTasks
            .filter(item => item.documentoId === documentoId)
            .map(item => {
              return {
                ...item,
                totalResources: item.totalResources+1
              }
            })
        ]
      };
    }

    case SENDINGMANAGER_ACTIONS.DELETESENDINGRESOURCE_SENDINGMANAGER: {
      let { documentoId } = (action as DeleteSendingResourceAction).payload;

      return {
        ...state,
        sendingTasks: [
          ...state.sendingTasks
            .filter(item => item.documentoId !== documentoId),
          ...state.sendingTasks
            .filter(item => item.documentoId === documentoId)
            .map(item => {
              return {
                ...item,
                totalResources: item.totalResources-1
              }
            })
        ]
      };
    }

    default: return state;
  }
};
