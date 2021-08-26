import {PerfilState, PerfilAction, PERFIL_ACTIONS} from './types';

const initialPerfilesState: PerfilState = {
  perfiles: [],
};

export const perfilReducer = (
  state: PerfilState = initialPerfilesState,
  action: PerfilAction,
): PerfilState => {
  switch (action.type) {
    case PERFIL_ACTIONS.SAVE_PERFIL:
      const {perfil} = action.payload;

      return {
        perfiles: [
          ...state.perfiles.filter(item => item.IdUsuario !== perfil.IdUsuario),
          perfil,
        ],
      };

    default:
      return state;
  }
};
