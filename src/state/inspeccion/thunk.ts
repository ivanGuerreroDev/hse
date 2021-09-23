import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveInspeccion} from './actions';
import {
  SaveInspeccionAsync,
  SaveInspeccionAsyncThunk,
  SaveInspeccionAction,
} from './types';
import {IInspecciones} from 'utils/types/menu';
import {IUser} from 'state/user/types';

export const saveInspeccionAsyncThunk: SaveInspeccionAsync = (
  userData: IUser,
): SaveInspeccionAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveInspeccionAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IInspecciones> = await axios({
          method: 'post',
          url: `${Config.UrlApi}/inspecciones`,
          data: {
            Usuario: userData.Username,
            Empresa: userData.Empresa,
          },
        });

        dispatch(saveInspeccion(response.data));
      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};
