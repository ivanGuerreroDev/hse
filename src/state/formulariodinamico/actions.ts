import {
  CancelEditDocumento,
  CancelEditDocumentoAction,
  ChangeStatusDocumento,
  ChangeStatusDocumentoAction,
  DeleteDocumento,
  DeleteDocumentoAction,
  DOCUMENTOS_ACTIONS,
  FORMULARIOS_ACTIONS,
  IDocumento,
  IFormulario,
  IResource,
  LoadDocumento,
  LoadDocumentoAction,
  RESOURCES_ACTIONS,
  SaveDocumento,
  SaveDocumentoAction,
  SaveFormulario,
  SaveFormularioAction,
  SaveResource,
  SaveResourceAction
} from './types';

export const cancelEditDocumento: CancelEditDocumento = (): CancelEditDocumentoAction => {
  let action: CancelEditDocumentoAction = {
    type: DOCUMENTOS_ACTIONS.CANCELEDIT_DOCUMENTO
  };

  return action;
};

export const changeStatusDocumento: ChangeStatusDocumento = (
  id: number,
  status: number
): ChangeStatusDocumentoAction => {
  let action: ChangeStatusDocumentoAction = {
    type: DOCUMENTOS_ACTIONS.CHANGESTATUS_DOCUMENTO,
    payload: {
      id,
      status
    }
  };

  return action;
};

export const deleteDocumento: DeleteDocumento = (
  id: number
): DeleteDocumentoAction => {
  let action: DeleteDocumentoAction = {
    type: DOCUMENTOS_ACTIONS.DELETE_DOCUMENTO,
    payload: {
      id
    }
  };

  return action;
};

export const loadDocumento: LoadDocumento = (
  documento: IDocumento
): LoadDocumentoAction => {
  let action: LoadDocumentoAction = {
    type: DOCUMENTOS_ACTIONS.LOAD_DOCUMENTO,
    payload: {
      documento
    }
  };

  return action;
};

export const saveDocumento: SaveDocumento = (): SaveDocumentoAction => {
  let action: SaveDocumentoAction = {
    type: DOCUMENTOS_ACTIONS.SAVE_DOCUMENTO
  };

  return action;
};

export const saveFormulario: SaveFormulario = (
  formulario: IFormulario
): SaveFormularioAction => {
  let action: SaveFormularioAction = {
    type: FORMULARIOS_ACTIONS.SAVE_FORMULARIO,
    payload: {
      formulario
    }
  };

  return action;
};

export const saveResource: SaveResource = (
  resource: IResource
): SaveResourceAction => {
  let action: SaveResourceAction = {
    type: RESOURCES_ACTIONS.SAVE_RESOURCE,
    payload: {
      resource
    }
  };

  return action;
};
