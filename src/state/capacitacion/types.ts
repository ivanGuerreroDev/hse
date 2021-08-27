import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {IUser} from 'state/user/types';
import {ICapacitacion} from 'utils/types/menu';

//#region State Interface

export interface CapacitacionState {
  capacitaciones: ICapacitacion[];
}

//#endregion

//#region Actions interfaces

export interface SaveCapacitacionAction extends AnyAction {
  payload: {
    capacitacion: ICapacitacion;
  };
}

//#endregion

//#region Combined actions interfaces type

export type CapacitacionAction = SaveCapacitacionAction;

//#endregion

//#region Actions func types

export type SaveCapacitacion = (
  capacitacion: ICapacitacion,
) => CapacitacionAction;

//#endregion

//#region Thunk interfaces

export type SaveCapacitacionAsyncThunk = ThunkAction<
  Promise<void>,
  {},
  {},
  SaveCapacitacionAction
>;

//#endregion

//#region Thunk func types

export type SaveCapacitacionAsync = (data: IUser) => SaveCapacitacionAsyncThunk;

//#endregion

//#region Action type enum

export enum CAPACITACION_ACTIONS {
  SAVE_CAPACITACION = 'SAVE_CAPACITACION',
}

//#endregion
