import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ICredentials} from 'utils/types/credentials';

//#region State Interface

export interface CredentialsState {
  credentials: ICredentials[];
}

//#endregion

//#region Actions interfaces

export interface SaveCredentialsAction extends AnyAction {
  payload: {
    credentials: ICredentials;
  };
}

//#endregion

//#region Combined actions interfaces type

export type CredentialsAction = SaveCredentialsAction;

//#endregion

//#region Actions func types

export type SaveCredentials = (credentials: ICredentials) => SaveCredentialsAction;

//#endregion

//#region Thunk interfaces

export type SaveCredentialsAsyncThunk = ThunkAction<
  Promise<void>,
  {},
  {},
  SaveCredentialsAction
>;

//#endregion

//#region Thunk func types

export type SaveCredentialsAsync = () => SaveCredentialsAsyncThunk;

//#endregion

//#region Action type enum

export enum CREDENTIALS_ACTIONS {
  SAVE_CREDENTIALS = 'SAVE_CREDENTIALS',
}

//#endregion
