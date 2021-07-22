import { AnyAction } from 'redux';

//#region State Interface

export interface IFormulario {

}

export interface IResource {

}

export interface FormulariosState {
  formularios: IFormulario[]
}

export interface ResourcesState {
  resources: IResource[]
}

//#endregion

//#region Actions interfaces

export interface SaveFormularioAction extends AnyAction {
  payload: {
    formulario: IFormulario
  }
}

export interface SaveResourceAction extends AnyAction {
  payload: {
    resource: IResource
  }
}

//#endregion

//#region Combined actions interfaces type

export type FormulariosAction = SaveFormularioAction;

export type ResourcesAction = SaveResourceAction;

//#endregion

//#region Actions func types

export type SaveFormulario = (formulario: IFormulario) => SaveFormularioAction;

export type SaveResource = (resource: IResource) => SaveResourceAction;

//#endregion

//#region Action type enum

export enum FORMULARIOS_ACTIONS {
  SAVE_FORMULARIO
}

export enum RESOURCES_ACTIONS {
  SAVE_RESOURCE
}

//#endregion
