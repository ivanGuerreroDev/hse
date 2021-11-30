import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveCredentials} from './actions';
import {SaveCredentialsAsync, SaveCredentialsAsyncThunk, SaveCredentialsAction} from './types';
import { ICredentials } from 'utils/types/credentials';

export const saveCredentialsAsyncThunk: SaveCredentialsAsync = (): SaveCredentialsAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveCredentialsAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<ICredentials> = await axios({
          method: 'post',
          url: 'https://znycob875f.execute-api.us-east-2.amazonaws.com/Prod/credentials'
         /*  url: `${Config.UrlApi}/perfil`, */
        });

        dispatch(saveCredentials(response.data));

      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};
