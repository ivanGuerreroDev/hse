import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IPerfil } from 'utils/types/perfil';
import { IUser } from 'state/user/types';

//#region State Interface

export interface PerfilState {
    perfiles: IPerfil[];
}

//#endregion

//#region Actions interfaces

export interface SavePerfilAction extends AnyAction {
    payload: {
        perfil: IPerfil;
    };
}

//#endregion

//#region Combined actions interfaces type

export type PerfilAction = SavePerfilAction;

//#endregion

//#region Actions func types

export type SavePerfil = (perfil: IPerfil) => SavePerfilAction;

//#endregion

//#region Thunk interfaces

export type SavePerfilAsyncThunk = ThunkAction<
    Promise<void>,
    {},
    {},
    SavePerfilAction
>;

//#endregion

//#region Thunk func types

export type SavePerfilAsync = (data: IUser) => SavePerfilAsyncThunk;

//#endregion

//#region Action type enum

export enum PERFIL_ACTIONS {
    SAVE_PERFIL = 'SAVE_PERFIL'
}

//#endregion
