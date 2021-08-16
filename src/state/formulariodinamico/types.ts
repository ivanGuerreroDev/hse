import { AnyAction } from 'redux';
import { IDocumento, IFormulario, IResource} from 'types/formulariodinamico';

//#region State Interface

export interface DocumentosState {
  documentos: IDocumento[]
}

export interface FormulariosState {
  formularios: IFormulario[]
}

export interface ResourcesState {
  resources: IResource[]
}

//#endregion

//#region Actions interfaces

export interface ChangeStatusDocumentoAction extends AnyAction {
  payload: {
    id: number,
    status: number
  }
}

export interface DeleteDocumentoAction extends AnyAction {
  payload: {
    id: number
  }
}

export interface SaveDocumentoAction extends AnyAction {
  payload: {
    documento: IDocumento
  }
}

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

export type DocumentosAction =
  ChangeStatusDocumentoAction |
  DeleteDocumentoAction |
  SaveDocumentoAction;

export type FormulariosAction = SaveFormularioAction;

export type ResourcesAction = SaveResourceAction;

//#endregion

//#region Actions func types
export type ChangeStatusDocumento = (id: number, status: number) => ChangeStatusDocumentoAction;

export type DeleteDocumento = (id: number) => DeleteDocumentoAction;

export type SaveDocumento = (documento: IDocumento) => SaveDocumentoAction;

export type SaveFormulario = (formulario: IFormulario) => SaveFormularioAction;

export type SaveResource = (resource: IResource) => SaveResourceAction;

//#endregion

//#region Action type enum

export enum DOCUMENTOS_ACTIONS {
  CHANGESTATUS_DOCUMENTO='CHANGESTATUS_DOCUMENTO',
  DELETE_DOCUMENTO='DELETE_DOCUMENTO',
  SAVE_DOCUMENTO='SAVE_DOCUMENTO',
}

export enum FORMULARIOS_ACTIONS {
  SAVE_FORMULARIO='SAVE_FORMULARIO'
}

export enum RESOURCES_ACTIONS {
  SAVE_RESOURCE='SAVE_RESOURCE'
}

//#endregion
