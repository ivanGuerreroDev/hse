import {
    AddPendingTask,
    AddPendingTaskAction,
    AddSendingResource,
    AddSendingResourceAction,
    AddSendingTask,
    AddSendingTaskAction,
    DeletePendingResource,
    DeletePendingResourceAction,
    DeletePendingTask,
    DeletePendingTaskAction,
    DeleteSendingResource,
    DeleteSendingResourceAction,
    DeleteSendingTask,
    DeleteSendingTaskAction,
    IPendingTask,
    ISendingTask,
    PENDINGMANAGER_ACTIONS,
    SENDINGMANAGER_ACTIONS,
    StartSending,
    StartSendingAction,
    StopSending,
    StopSendingAction
} from './types';

export const startSending: StartSending = (): StartSendingAction => {
    let action: StartSendingAction = {
        type: SENDINGMANAGER_ACTIONS.STARTSENDING_SENDINGMANAGER
    };

    return action;
};

export const stopSending: StopSending = (): StopSendingAction => {
    let action: StopSendingAction = {
        type: SENDINGMANAGER_ACTIONS.STOPSENDING_SENDINGMANAGER
    };

    return action;
};

export const addPendingTask: AddPendingTask = (
    pendingTask: IPendingTask
): AddPendingTaskAction => {
    let action: AddPendingTaskAction = {
        type: PENDINGMANAGER_ACTIONS.ADDPENDINGTASK_PENDINGMANAGER,
        payload: {
            pendingTask
        }
    };

    return action;
};

export const addSendingTask: AddSendingTask = (
    sendingTask: ISendingTask
): AddSendingTaskAction => {
    let action: AddSendingTaskAction = {
        type: SENDINGMANAGER_ACTIONS.ADDSENDINGTASK_SENDINGMANAGER,
        payload: {
            sendingTask
        }
    };

    return action;
};

export const deletePendingTask: DeletePendingTask = (
    documentoId: string
): DeletePendingTaskAction => {
    let action: DeletePendingTaskAction = {
        type: PENDINGMANAGER_ACTIONS.DELETEPENDINGTASK_PENDINGMANAGER,
        payload: {
            documentoId
        }
    };

    return action;
};

export const deleteSendingTask: DeleteSendingTask = (
    documentoId: string
): DeleteSendingTaskAction => {
    let action: DeleteSendingTaskAction = {
        type: SENDINGMANAGER_ACTIONS.DELETESENDINGTASK_SENDINGMANAGER,
        payload: {
            documentoId
        }
    };

    return action;
};

export const deletePendingResource: DeletePendingResource = (
    documentoId: string,
    resourceUri: string
): DeletePendingResourceAction => {
    let action: DeletePendingResourceAction = {
        type: PENDINGMANAGER_ACTIONS.DELETEPENDINGRESOURCE_PENDINGMANAGER,
        payload: {
            documentoId,
            resourceUri
        }
    };

    return action;
};

export const addSendingResource: AddSendingResource = (
    documentoId: string
): AddSendingResourceAction => {
    let action: AddSendingResourceAction = {
        type: SENDINGMANAGER_ACTIONS.ADDSENDINGRESOURCE_SENDINGMANAGER,
        payload: {
            documentoId
        }
    };

    return action;
};

export const deleteSendingResource: DeleteSendingResource = (
    documentoId: string
): DeleteSendingResourceAction => {
    let action: DeleteSendingResourceAction = {
        type: SENDINGMANAGER_ACTIONS.DELETESENDINGRESOURCE_SENDINGMANAGER,
        payload: {
            documentoId
        }
    };

    return action;
};
