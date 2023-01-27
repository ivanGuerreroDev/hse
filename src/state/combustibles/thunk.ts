import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import Config from 'react-native-config';
import { saveCombustibles, saveContadorUC } from './actions';
import {
    SaveCombustiblesAsync,
    SaveCombustiblesAsyncThunk,
    SaveCombustiblesAction,
    SaveContadorUCAction
} from './types';
import { ICombustibles, IContadorUC } from 'utils/types/menu';
import { IUser } from 'state/user/types';

export const saveCombustiblesAsyncThunk: SaveCombustiblesAsync = (
    userData: IUser
): SaveCombustiblesAsyncThunk => {
    return async (
        dispatch: ThunkDispatch<{}, {}, SaveCombustiblesAction|SaveContadorUCAction>
    ): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const combustiblesRsp: AxiosResponse<ICombustibles> = await axios({
                    method: 'post',
                    url: `${Config.UrlApi}/combustibles-app`,
                    data: {
                        Usuario: userData.Username,
                        Empresa: userData.Empresa
                    }
                });
                dispatch(saveCombustibles(combustiblesRsp.data));
                const contadorUCRsp: AxiosResponse<IContadorUC[]> = await axios({
                    method: 'post',
                    url: `${Config.UrlApi}/contador-unidades-consumo`,
                    data: {
                        Usuario: userData.Username,
                        Empresa: userData.Empresa
                    }
                }); 
                dispatch(saveContadorUC(contadorUCRsp.data));
            } catch (error) {
                console.error(error);
                reject(error);
            } finally {
                resolve();
            }
        });
    };
};
