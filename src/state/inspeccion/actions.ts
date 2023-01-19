import {
    SaveInspeccion,
    SaveInspeccionAction,
    INSPECCION_ACTIONS
} from './types';
import { IInspecciones } from 'utils/types/menu';

export const saveInspeccion: SaveInspeccion = (
    inspeccion: IInspecciones
): SaveInspeccionAction => {
    let action: SaveInspeccionAction = {
        type: INSPECCION_ACTIONS.SAVE_INSPECCION,
        payload: {
            inspeccion
        }
    };
    return action;
};
