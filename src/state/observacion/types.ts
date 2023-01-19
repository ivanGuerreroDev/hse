import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser } from 'state/user/types';
import { IObservaciones } from 'utils/types/menu';

//#region State Interface

export interface ObservacionState {
    observaciones: IObservaciones[];
}

//#endregion

//#region Actions interfaces

export interface SaveObservacionAction extends AnyAction {
    payload: {
        observacion: IObservaciones;
    };
}

//#endregion

//#region Combined actions interfaces type

export type ObservacionAction = SaveObservacionAction;

//#endregion

//#region Actions func types

export type SaveObservacion = (
    obsercacion: IObservaciones
) => ObservacionAction;

//#endregion

//#region Thunk interfaces

export type SaveObservacionAsyncThunk = ThunkAction<
    Promise<void>,
    {},
    {},
    SaveObservacionAction
>;

//#endregion

//#region Thunk func types

export type SaveObservacionAsync = (data: IUser) => SaveObservacionAsyncThunk;

//#endregion

//#region Action type enum

export enum OBSERVACION_ACTIONS {
    SAVE_OBSERVACION = 'SAVE_OBSERVACION'
}

//#endregion
