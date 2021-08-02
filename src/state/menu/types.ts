import {AnyAction} from 'redux';

export interface CurrentUser {
  Rut: number;
  Dv: string;
  Nombre: string;
  Correo: string;
  Empresa: string;
  CentroTrabajo: string;
  Cargo: string;
}

export interface UserState {
  currentUserList: CurrentUser[];
}

export interface CurrentUserState {
  currentUser: CurrentUser | undefined;
}

export interface SaveCurrentUserAction extends AnyAction {
  payload: {
    currentUser: CurrentUser;
  };
}

//#endregion

//#region Combined actions interfaces type

export type UserAction = ForgiveUserAction | SaveUserAction;

//#endregion

//#region Actions func types

export type ForgiveUser = () => ForgiveUserAction;

export type SaveUser = (user: User) => SaveUserAction;

//#endregion

//#region Action type enum

export enum USER_ACTIONS {
  FORGIVE_USER,
  SAVE_USER,
}

//#endregion
