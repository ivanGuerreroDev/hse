import {
  SaveObservacion,
  SaveObservacionAction,
  OBSERVACION_ACTIONS,
} from './types';
import {IObservaciones} from 'utils/types/menu';

export const saveObservacion: SaveObservacion = (
  observacion: IObservaciones,
): SaveObservacionAction => {
  let action: SaveObservacionAction = {
    type: OBSERVACION_ACTIONS.SAVE_OBSERVACION,
    payload: {
      observacion,
    },
  };
  return action;
};
