import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { DocumentoStatus, IDocumento, IFormulario, ILocalResource, IResource } from 'types/formulariodinamico';

//#region State Interface

export interface DocumentosState {
  documentos: IDocumento[]
}

export interface FormulariosState {
  formularios: IFormulario[]
}

export interface ResourcesState {
  resources: ILocalResource[]
}

//#endregion

//#region Actions interfaces

export interface ChangeStatusDocumentoAction extends AnyAction {
  payload: {
    id: string,
    status: DocumentoStatus
  }
}

export interface DeleteDocumentoAction extends AnyAction {
  payload: {
    id: string
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
    resource: ILocalResource
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

export type ChangeStatusDocumento = (id: string, status: DocumentoStatus) => ChangeStatusDocumentoAction;

export type DeleteDocumento = (id: string) => DeleteDocumentoAction;

export type SaveDocumento = (documento: IDocumento) => SaveDocumentoAction;

export type SaveFormulario = (formulario: IFormulario) => SaveFormularioAction;

export type SaveResource = (resource: ILocalResource) => SaveResourceAction;

//#endregion

//#region Thunk interfaces

export type SaveFormularioAsyncThunk = ThunkAction<Promise<void>, {}, {}, SaveFormularioAction>;

export type SaveLocalResourceAsyncThunk = ThunkAction<Promise<ILocalResource>, {}, {}, SaveResourceAction>;

//#endregion

//#region Thunk func types

export type SaveFormularioAsync = () => SaveFormularioAsyncThunk;

export type SaveLocalResourceAsync = (resource: IResource) => SaveLocalResourceAsyncThunk;

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
