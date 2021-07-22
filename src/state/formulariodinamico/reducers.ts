import { FORMULARIOS_ACTIONS, FormulariosAction, FormulariosState } from './types';

const initialState: FormulariosState = {
  formularios: []
};

export const formulariosReducer = (
  state: FormulariosState = initialState,
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
