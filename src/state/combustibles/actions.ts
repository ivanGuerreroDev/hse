import {
    SaveCombustibles,
    SaveCombustiblesAction,
    SaveContadorUC,
    SaveContadorUCAction,
    COMBUSTIBLES_ACTIONS,
    CONTADOR_UC_ACTIONS
} from './types';
import { ICombustibles, IContadorUC } from 'utils/types/menu';

export const saveCombustibles: SaveCombustibles= (
    combustibles: ICombustibles
): SaveCombustiblesAction => {
    let action: SaveCombustiblesAction = {
        type: COMBUSTIBLES_ACTIONS.SAVE_COMBUSTIBLES,
        payload: {
            combustibles: combustibles
        }
    };
    return action;
};

export const saveContadorUC: SaveContadorUC= (
    contadorUC: IContadorUC[]
): SaveContadorUCAction => {
    let action: SaveContadorUCAction = {
        type: CONTADOR_UC_ACTIONS.SAVE_CONTADOR_UC,
        payload: {
            contadorUC : contadorUC
        }
    };
    return action;
};
