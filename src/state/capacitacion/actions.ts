import {
    SaveCapacitacion,
    SaveCapacitacionAction,
    CAPACITACION_ACTIONS
} from './types';
import { ICapacitacion } from 'utils/types/menu';

export const saveCapacitacion: SaveCapacitacion = (
    capacitacion: ICapacitacion
): SaveCapacitacionAction => {
    let action: SaveCapacitacionAction = {
        type: CAPACITACION_ACTIONS.SAVE_CAPACITACION,
        payload: {
            capacitacion
        }
    };
    return action;
};
