import {
  FormulariosAction,
  FormulariosState,
  ResourcesState,
  ResourcesAction,
  RESOURCES_ACTIONS,
  FORMULARIOS_ACTIONS,
  DocumentosState,
  DocumentosAction,
  DOCUMENTOS_ACTIONS,
  ChangeStatusDocumentoAction,
  DeleteDocumentoAction
} from './types';

const initialDocumentosState: DocumentosState = {
  documentos: [],
  editing: undefined
}

export const documentosReducer = (
  state: DocumentosState = initialDocumentosState,
  action: DocumentosAction
): DocumentosState => {
  switch (action.type) {
    case DOCUMENTOS_ACTIONS.CANCELEDIT_DOCUMENTO:
      return {
        ...state,
        editing: undefined
      };

    case DOCUMENTOS_ACTIONS.CHANGESTATUS_DOCUMENTO: {
      let { id, status } = action.payload;

      return {
        ...state,
        documentos: [
          ...state.documentos
        ]
      };
    }

    case DOCUMENTOS_ACTIONS.DELETE_DOCUMENTO: {
      let { id } = action.payload;

      return {
        ...state,
        documentos: [
          ...state.documentos
        ]
      };
    }

    case DOCUMENTOS_ACTIONS.LOAD_DOCUMENTO: {
      let { documento } = action.payload;

      return {
        ...state,
        editing: documento
      };
    }

    case DOCUMENTOS_ACTIONS.SAVE_DOCUMENTO: {
      if (state.editing) {
        return {
          documentos: [
            ...state.documentos,
            state.editing
          ],
          editing: undefined
        };
      }
      else
        return state;
    }

    default:
      return state;
  }
};

const initialFormulariosState: FormulariosState = {
  formularios: []
};

export const formulariosReducer = (
  state: FormulariosState = initialFormulariosState,
  action: FormulariosAction
): FormulariosState => {
  switch (action.type) {
    case FORMULARIOS_ACTIONS.SAVE_FORMULARIO:
      const { formulario } = action.payload;

      return {
        formularios: [
          ...state.formularios,
          formulario
        ]
      }

    default:
      return state;
  }
};

const initialResourcesState: ResourcesState = {
  resources: []
};

export const resourcesReducer = (
  state: ResourcesState = initialResourcesState,
  action: ResourcesAction
): ResourcesState => {
  switch (action.type) {
    case RESOURCES_ACTIONS.SAVE_RESOURCE:
      const { resource } = action.payload;

      return {
        resources: [
          ...state.resources,
          resource
        ]
      };

    default:
      return state;
  }
};
