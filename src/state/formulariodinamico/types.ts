import { AnyAction } from 'redux';

//#region State Interface

export interface IFormulario {

}

export interface FormulariosState {
  formularios: IFormulario[]
}

//#endregion

//#region Actions interfaces

export interface SaveFormularioAction extends AnyAction {
  payload: {
    formulario: IFormulario
  }
}

//#endregion

//#region Combined actions interfaces type

export type FormulariosAction = SaveFormularioAction;

//#endregion

//#region Actions func types

export type SaveFormulario = (formulario: IFormulario) => SaveFormularioAction;

//#endregion

//#region Action type enum

export enum FORMULARIOS_ACTIONS {
  SAVE_FORMULARIO
}

//#endregion
