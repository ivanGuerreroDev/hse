import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser } from 'state/user/types';
import { ICombustibles, IContadorUC } from 'utils/types/menu';

//#region State Interface

export interface CombustiblesState {
    combustibles?: ICombustibles[];
    contadorUC?: IContadorUC[]
}

//#endregion

//#region Actions interfaces

export interface SaveCombustiblesAction extends AnyAction {
    payload: {
        combustibles?: ICombustibles;
    };
}

export interface SaveContadorUCAction extends AnyAction {
    payload: {
        contadorUC?: IContadorUC[];
    };
}

//#endregion

//#region Combined actions interfaces type

export type CombustiblesAction = SaveCombustiblesAction;

export type ContadorUCAction = SaveContadorUCAction;


//#endregion

//#region Actions func types

export type SaveCombustibles = (combustibles: ICombustibles) => CombustiblesAction;

export type SaveContadorUC = (contadorUC: IContadorUC[]) => SaveContadorUCAction;


//#endregion

//#region Thunk interfaces

export type SaveCombustiblesAsyncThunk = ThunkAction<
    Promise<void>,
    {},
    {},
    SaveCombustiblesAction | SaveContadorUCAction
>;

//#endregion

//#region Thunk func types

export type SaveCombustiblesAsync = (data: IUser) => SaveCombustiblesAsyncThunk;

//#endregion

//#region Action type enum

export enum COMBUSTIBLES_ACTIONS {
    SAVE_COMBUSTIBLES = 'SAVE_COMBUSTIBLES'
}

export enum CONTADOR_UC_ACTIONS {
    SAVE_CONTADOR_UC = 'SAVE_CONTADOR_UC'
}

//#endregion
