import {InspeccionState, InspeccionAction, INSPECCION_ACTIONS} from './types';

const initialInspeccionState: InspeccionState = {
  inspecciones: [],
};

export const inspeccionReducer = (
  state: InspeccionState = initialInspeccionState,
  action: InspeccionAction,
): InspeccionState => {
  switch (action.type) {
    case INSPECCION_ACTIONS.SAVE_INSPECCION:
      const {inspeccion} = action.payload;
      return {
        inspecciones: [
          ...state.inspecciones.filter(item => item.Id !== inspeccion.Id),
          inspeccion,
        ],
      };

    default:
      return state;
  }
};
