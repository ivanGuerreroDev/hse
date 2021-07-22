import {
  FormulariosAction,
  FormulariosState,
  ResourcesState,
  ResourcesAction,
  RESOURCES_ACTIONS,
  FORMULARIOS_ACTIONS
} from './types';

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
