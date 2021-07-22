import {
  FORMULARIOS_ACTIONS,
  IFormulario,
  SaveFormulario,
  SaveFormularioAction
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
