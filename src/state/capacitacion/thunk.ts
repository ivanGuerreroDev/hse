import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveCapacitacion} from './actions';
import {
  SaveCapacitacionAsync,
  SaveCapacitacionAsyncThunk,
  SaveCapacitacionAction,
} from './types';
import {ICapacitacion} from 'utils/types/menu';
import {IUser} from 'state/user/types';

export const saveCapacitacionAsyncThunk: SaveCapacitacionAsync = (
  userData: IUser,
): SaveCapacitacionAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveCapacitacionAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<ICapacitacion> = await axios({
          method: 'post',
          url: `${Config.UrlApi}/capacitaciones`,
          data: {
            Empresa: userData.Empresa,
          },
        });
        console.log("@@ response ICapacitacion: ")
        let responseStr = JSON.stringify(response.data)
        console.log(response.status)
        console.log(typeof response , ' ', responseStr?.slice(responseStr.length - 100, responseStr.length))
        dispatch(saveCapacitacion(response.data));
      } catch (error) {
        console.error(error)
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};
