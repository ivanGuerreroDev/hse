import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveObservacion} from './actions';
import {
  SaveObservacionAsync,
  SaveObservacionAsyncThunk,
  SaveObservacionAction,
} from './types';
import {IObservaciones} from 'utils/types/menu';
import {IUser} from 'state/user/types';

export const saveObservacionAsyncThunk: SaveObservacionAsync = (
  userData: IUser,
): SaveObservacionAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveObservacionAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IObservaciones> = await axios({
          method: 'post',
          url: `${Config.UrlApi}/observaciones`,
          data: {
            Empresa: userData.Empresa,
          },
        });
        dispatch(saveObservacion(response.data));
      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};
