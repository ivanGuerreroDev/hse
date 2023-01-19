import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser } from 'state/user/types';
import { IInspecciones } from 'utils/types/menu';

//#region State Interface

export interface InspeccionState {
    inspecciones: IInspecciones[];
}

//#endregion

//#region Actions interfaces

export interface SaveInspeccionAction extends AnyAction {
    payload: {
        inspeccion: IInspecciones;
    };
}

//#endregion

//#region Combined actions interfaces type

export type InspeccionAction = SaveInspeccionAction;

//#endregion

//#region Actions func types

export type SaveInspeccion = (inspeccion: IInspecciones) => InspeccionAction;

//#endregion

//#region Thunk interfaces

export type SaveInspeccionAsyncThunk = ThunkAction<
    Promise<void>,
    {},
    {},
    SaveInspeccionAction
>;

//#endregion

//#region Thunk func types

export type SaveInspeccionAsync = (data: IUser) => SaveInspeccionAsyncThunk;

//#endregion

//#region Action type enum

export enum INSPECCION_ACTIONS {
    SAVE_INSPECCION = 'SAVE_INSPECCION'
}

//#endregion
