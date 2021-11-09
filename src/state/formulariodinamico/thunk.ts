import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
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

export const saveFormulariosAsync: SaveFormularioAsync =
  (): SaveFormularioAsyncThunk => {
    return async (
      dispatch: ThunkDispatch<{}, {}, SaveFormularioAction>,
    ): Promise<void> => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const response: AxiosResponse<IFormulario[]> = await axios.get(
            `${Config.UrlFormularios}/formularios`,
          );

        response.data.forEach((formulario: IFormulario) => {
          dispatch(saveFormulario(formulario));

          formulario.resources?.forEach((resource: IResource) => dispatch(saveLocalResourceAsync(resource)));
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
            headers: {
              'Content-Type': 'application/json'
            },
            method: resource.method,
            data: resource.body
          });

          const localResource: ILocalResource = {
            url: resource.url,
            type: resource.type,
            method: resource.method,
            body: resource.body,
            localData: response.data
          };

          dispatch(saveResource(localResource));
          resolve(localResource);
        }
      } catch (error) {
        console.log(error, resource.body);
        reject(error);
      }
    });
  };
};
