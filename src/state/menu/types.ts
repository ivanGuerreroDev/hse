import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {IUser} from 'state/user/types';
import {MenuData} from 'utils/types/menu';

//#region State Interface

export interface MenuState {
  menus: MenuData[];
}

//#endregion

//#region Actions interfaces

export interface SaveMenuAction extends AnyAction {
  payload: {
    menu: MenuData;
  };
}

//#endregion

//#region Combined actions interfaces type

export type MenuAction = SaveMenuAction;

//#endregion

//#region Actions func types

export type SaveMenu = (menu: MenuData) => SaveMenuAction;

//#endregion

//#region Thunk interfaces

export type SaveMenuAsyncThunk = ThunkAction<
  Promise<void>,
  {},
  {},
  SaveMenuAction
>;

//#endregion

//#region Thunk func types

export type SaveMenuAsync = (data: IUser) => SaveMenuAsyncThunk;

//#endregion

//#region Action type enum

export enum MENU_ACTIONS {
  SAVE_MENU = 'SAVE_MENU',
}

//#endregion
