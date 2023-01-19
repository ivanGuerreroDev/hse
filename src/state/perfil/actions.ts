import { SavePerfil, SavePerfilAction, PERFIL_ACTIONS } from './types';

import { IPerfil } from 'utils/types/perfil';

export const savePerfil: SavePerfil = (perfil: IPerfil): SavePerfilAction => {
    let action: SavePerfilAction = {
        type: PERFIL_ACTIONS.SAVE_PERFIL,
        payload: {
            perfil
        }
    };

    return action;
};
