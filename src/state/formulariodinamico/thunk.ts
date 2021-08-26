import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import Config from 'react-native-config';
import { saveFormulario, saveResource } from './actions';
import { IFormulario, ILocalResource, IResource } from 'types/formulariodinamico';
import {
  SaveFormularioAction,
  SaveFormularioAsync,
  SaveFormularioAsyncThunk,
  SaveLocalResourceAsync,
  SaveLocalResourceAsyncThunk,
  SaveResourceAction
} from './types';

export const saveFormulariosAsync: SaveFormularioAsync = (): SaveFormularioAsyncThunk => {
  return async (dispatch: ThunkDispatch<{}, {}, SaveFormularioAction>): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IFormulario[]> = await axios.get(
          `${Config.UrlFormularios}/formularios`
        );

        response.data.forEach((formulario: IFormulario) => {
          dispatch(saveFormulario(formulario));
        });
      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};

export const saveLocalResourceAsync: SaveLocalResourceAsync = (resource: IResource): SaveLocalResourceAsyncThunk => {
  return async (dispatch: ThunkDispatch<{}, {}, SaveResourceAction>): Promise<ILocalResource> => {
    return new Promise<ILocalResource>(async (resolve, reject) => {
      try {
        if (resource.type === 'api') {
          const response: AxiosResponse<any> = await axios({
            url: resource.url,
            method: resource.method,
            data: resource.body
          });

          dispatch(saveResource({
            url: resource.url,
            type: resource.type,
            method: resource.method,
            body: resource.body,
            localData: response.data
          }));
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};
