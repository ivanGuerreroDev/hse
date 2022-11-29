import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveMenu} from './actions';
import {SaveMenuAsync, SaveMenuAsyncThunk, SaveMenuAction} from './types';
import {IMenu} from 'utils/types/menu';
import {IUser} from 'state/user/types';

export const saveMenusAsyncThunk: SaveMenuAsync = (
  userData: IUser,
): SaveMenuAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveMenuAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IMenu> = await axios({
          method: 'post',
          url: `${Config.UrlApi}/menu`,
          data: {
            Empresa: userData.Empresa,
          },
        });
        dispatch(saveMenu(response.data));
      } catch (error) {
        console.error(error)
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};
