import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import Config from 'react-native-config';
import { savePerfil } from './actions';
import {
    SavePerfilAsync,
    SavePerfilAsyncThunk,
    SavePerfilAction
} from './types';
import { IPerfil } from 'utils/types/perfil';
import { IUser } from 'state/user/types';

export const savePerfilesAsync: SavePerfilAsync = (
    userData: IUser
): SavePerfilAsyncThunk => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SavePerfilAction>
    ): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const response: AxiosResponse<IPerfil> = await axios({
                    method: 'post',
                    url: `${Config.UrlApi}/perfil`,
                    data: {
                        Username: userData.Username,
                        Empresa: userData.Empresa
                    }
                });
                dispatch(savePerfil(response.data));
            } catch (error) {
                console.error(error);
                reject(error);
            } finally {
                resolve();
            }
        });
    };
};
