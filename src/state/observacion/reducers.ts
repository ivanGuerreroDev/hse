import {
    ObservacionState,
    ObservacionAction,
    OBSERVACION_ACTIONS
} from './types';

const initialObservacionState: ObservacionState = {
    observaciones: []
};

export const observacionReducer = (
    state: ObservacionState = initialObservacionState,
    action: ObservacionAction
): ObservacionState => {
    switch (action.type) {
        case OBSERVACION_ACTIONS.SAVE_OBSERVACION:
            const { observacion } = action.payload;
            return {
                observaciones: [
                    ...state.observaciones.filter(
                        (item) => item.Id !== observacion.Id
                    ),
                    observacion
                ]
            };

        default:
            return state;
    }
};
