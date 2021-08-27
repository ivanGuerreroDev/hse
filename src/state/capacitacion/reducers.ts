import {
  CapacitacionState,
  CapacitacionAction,
  CAPACITACION_ACTIONS,
} from './types';

const initialCapacitacionState: CapacitacionState = {
  capacitaciones: [],
};

export const capacitacionReducer = (
  state: CapacitacionState = initialCapacitacionState,
  action: CapacitacionAction,
): CapacitacionState => {
  switch (action.type) {
    case CAPACITACION_ACTIONS.SAVE_CAPACITACION:
      const {capacitacion} = action.payload;
      console.log('reducers', capacitacion);
      return {
        capacitaciones: [
          ...state.capacitaciones.filter(
            item => item.IdCapacitacion !== capacitacion.IdCapacitacion,
          ),
          capacitacion,
        ],
      };

    default:
      return state;
  }
};
