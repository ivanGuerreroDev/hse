import {AnyAction} from 'redux';
import {
  AttributeType,
  AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';

//#region State interface

export interface IUser {
  Username: string;
  UserTokens: AuthenticationResultType;
}

export interface UserState {
  userList: IUser[];
  rememberUser: IUser | undefined;
}

export interface CurrentUserState {
  user: IUser | undefined;
}

//#endregion

//#region Actions interfaces

export interface ForgiveUserAction extends AnyAction {}

export interface SaveUserAction extends AnyAction {
  payload: {
    user: IUser;
    remember: boolean;
  };
}

//#endregion

//#region Combined actions interfaces type

export type UserAction = ForgiveUserAction | SaveUserAction;

//#endregion

//#region Actions func types

export type ForgiveUser = () => ForgiveUserAction;

export type SaveUser = (user: IUser, remember: boolean) => SaveUserAction;

//#endregion

//#region Action type enum

export enum USER_ACTIONS {
  FORGIVE_USER,
  SAVE_USER,
}

//#endregion
