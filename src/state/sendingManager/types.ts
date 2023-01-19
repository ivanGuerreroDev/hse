import { AnyAction } from 'redux';

//#region State Interface

export interface IPendingTask {
    documentoId: string;
    pendingResourcesUri: Array<string>;
}

export interface PendingManagerState {
    pendingTasks: Array<IPendingTask>;
}

export interface ISendingTask {
    documentoId: string;
    totalResources: number;
}

export interface SendingManagerState {
    isSending: boolean;
    sendingTasks: Array<ISendingTask>;
}

//#endregion

//#region Actions interfaces

export interface StartSendingAction extends AnyAction {}

export interface StopSendingAction extends AnyAction {}

export interface AddPendingTaskAction extends AnyAction {
    payload: {
        pendingTask: IPendingTask;
    };
}

export interface AddSendingTaskAction extends AnyAction {
    payload: {
        sendingTask: ISendingTask;
    };
}

export interface DeletePendingTaskAction extends AnyAction {
    payload: {
        documentoId: string;
    };
}

export interface DeleteSendingTaskAction extends AnyAction {
    payload: {
        documentoId: string;
    };
}

export interface DeletePendingResourceAction extends AnyAction {
    payload: {
        documentoId: string;
        resourceUri: string;
    };
}

export interface AddSendingResourceAction extends AnyAction {
    payload: {
        documentoId: string;
    };
}

export interface DeleteSendingResourceAction extends AnyAction {
    payload: {
        documentoId: string;
    };
}

//#endregion

//#region Combined actions interfaces type

export type PendingManagerAction =
    | AddPendingTaskAction
    | DeletePendingTaskAction
    | DeletePendingResourceAction;

export type SendingManagerAction =
    | StartSendingAction
    | StopSendingAction
    | AddSendingTaskAction
    | DeleteSendingTaskAction
    | AddSendingResourceAction
    | DeleteSendingResourceAction;

//#endregion

//#region Actions func types

export type StartSending = () => StartSendingAction;

export type StopSending = () => StopSendingAction;

export type AddPendingTask = (
    pendingTask: IPendingTask
) => AddPendingTaskAction;

export type AddSendingTask = (
    sendingTask: ISendingTask
) => AddSendingTaskAction;

export type DeletePendingTask = (
    documentoId: string
) => DeletePendingTaskAction;

export type DeleteSendingTask = (
    documentoId: string
) => DeleteSendingTaskAction;

export type DeletePendingResource = (
    documentoId: string,
    resourceUri: string
) => DeletePendingResourceAction;

export type AddSendingResource = (
    documentoId: string
) => AddSendingResourceAction;

export type DeleteSendingResource = (
    documentoId: string
) => DeleteSendingResourceAction;

//#endregion

//#region Action type enum

export enum PENDINGMANAGER_ACTIONS {
    ADDPENDINGTASK_PENDINGMANAGER = 'ADDPENDINGTASK_PENDINGMANAGER',
    DELETEPENDINGTASK_PENDINGMANAGER = 'DELETEPENDINGTASK_PENDINGMANAGER',
    DELETEPENDINGRESOURCE_PENDINGMANAGER = 'DELETEPENDINGRESOURCE_PENDINGMANAGER'
}

export enum SENDINGMANAGER_ACTIONS {
    STARTSENDING_SENDINGMANAGER = 'STARTSENDING_SENDINGMANAGER',
    STOPSENDING_SENDINGMANAGER = 'STOPSENDING_SENDINGMANAGER',
    ADDSENDINGTASK_SENDINGMANAGER = 'ADDSENDINGTASK_SENDINGMANAGER',
    DELETESENDINGTASK_SENDINGMANAGER = 'DELETESENDINGTASK_SENDINGMANAGER',
    ADDSENDINGRESOURCE_SENDINGMANAGER = 'ADDSENDINGRESOURCE_SENDINGMANAGER',
    DELETESENDINGRESOURCE_SENDINGMANAGER = 'DELETESENDINGRESOURCE_SENDINGMANAGER'
}

//#endregion
