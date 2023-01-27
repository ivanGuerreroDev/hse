import { CombustiblesState, CombustiblesAction, ContadorUCAction, COMBUSTIBLES_ACTIONS, CONTADOR_UC_ACTIONS } from './types';
import { ICombustibles, IContadorUC } from 'utils/types/menu';
import _ from 'lodash-es';

const initialCombustiblesState: CombustiblesState = {
    combustibles: [],
    contadorUC: []
};

export const combustiblesReducer = (
    state: CombustiblesState = initialCombustiblesState,
    action: CombustiblesAction | ContadorUCAction
): CombustiblesState => {
    switch (action.type) {
        case COMBUSTIBLES_ACTIONS.SAVE_COMBUSTIBLES:
            const { combustibles } = action.payload;
            const prevState = state?.combustibles ? state?.combustibles?.filter(
                (item: any) => item?.Id !== combustibles?.Id
            ) : []
            return {
                ...state,
                combustibles: [
                    ...prevState,
                    combustibles
                ]
            };
        case CONTADOR_UC_ACTIONS.SAVE_CONTADOR_UC:
            const { contadorUC } = action.payload;
            return {
                ...state,
                contadorUC: contadorUC
            };

        default:
            return state;
    }
};
