import {
  FORMULARIOS_ACTIONS,
  IFormulario,
  IResource,
  RESOURCES_ACTIONS,
  SaveFormulario,
  SaveFormularioAction,
  SaveResource,
  SaveResourceAction
} from './types';

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
