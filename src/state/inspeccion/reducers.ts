import {InspeccionState, InspeccionAction, INSPECCION_ACTIONS} from './types';

const initialObservacionState: InspeccionState = {
  inspecciones: [],
};

export const inspeccionReducer = (
  state: InspeccionState = initialObservacionState,
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
