import axios, {AxiosResponse} from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import Config from 'react-native-config';
import {saveFormulario, saveResource} from './actions';
import {IFormulario, ILocalResource, IResource} from 'types/formulariodinamico';
import {
  SaveFormularioAction,
  SaveFormularioAsync,
  SaveFormularioAsyncThunk,
  SaveLocalResourceAsync,
  SaveLocalResourceAsyncThunk,
  SaveResourceAction,
} from './types';
import {IUser} from 'state/user/types';

export const saveFormulariosAsync: SaveFormularioAsync = (
  user: IUser,
): SaveFormularioAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveFormularioAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IFormulario[]> = await axios.get(
          `${Config.UrlFormularios}/formularios`,
          {
            data: {
              Empresa: user.Empresa,
              Usuario: user.Username,
            },
          },
        );

        response.data.forEach((formulario: IFormulario) => {
          dispatch(saveFormulario(formulario));

          formulario.resources?.forEach((resource: IResource) =>
            dispatch(saveLocalResourceAsync(resource, user)),
          );
        });
      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  };
};

export const saveLocalResourceAsync: SaveLocalResourceAsync = (
  resource: IResource,
  user: IUser,
): SaveLocalResourceAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveResourceAction>,
  ): Promise<ILocalResource> => {
    return new Promise<ILocalResource>(async (resolve, reject) => {
      try {
        if (resource.type === 'api') {
          /* const response: AxiosResponse<any> = await axios({
            method: resource.method,
            url: resource.url,
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              ...resource.body,
              Empresa: user.Empresa,
              Username: user.Username
            },
          }); */

          const response: AxiosResponse<any> = await axios({
            method: 'post',
            url: resource.url,
            data: {
              Username: user.Username,
              Empresa: user.Empresa,
            },
          });
          console.table('response', response);


          const localResource: ILocalResource = {
            url: resource.url,
            type: resource.type,
            method: resource.method,
            body: resource.body,
            localData: response.data,
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
