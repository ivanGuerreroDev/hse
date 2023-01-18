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
  SaveResourceAction,
} from './types';
import { IUser } from 'state/user/types';

export const saveFormulariosAsync: SaveFormularioAsync = (
  userData: IUser,
): SaveFormularioAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveFormularioAction>,
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<IFormulario[]> = await axios.post(
          `${Config.UrlFormularios}/formularios`, {
          data: {
            Empresa: userData.Empresa,
            Usuario: userData.Username
          },
        }).catch(error=>{
          throw error;
        });
        if(response?.data?.length > 0) response.data.forEach((formulario: IFormulario) => {
          dispatch(saveFormulario(formulario));
          formulario.resources?.forEach((resource: IResource) =>{
            dispatch(saveLocalResourceAsync(resource, userData,))
          });
        });
      } catch (error) {
        reject(error);
      } /* finally {
        resolve();
      } */
    });
  };
};

export const saveLocalResourceAsync: SaveLocalResourceAsync = (
  resource: ILocalResource,
  userData: IUser,
): SaveLocalResourceAsyncThunk => {
  return async (
    dispatch: ThunkDispatch<{}, {}, SaveResourceAction>,
  ): Promise<ILocalResource> => {
    return new Promise<ILocalResource>(async (resolve, reject) => {
      try {
        if (resource.type === 'api') {
          //   const response: AxiosResponse<any> = await axios({
          //   method: resource.method,
          //   url: resource.url,
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   data: {

          //   },
          // });
          const response: AxiosResponse<any> = await axios({
            method: 'post',
            url: resource.url,
            data: {
              Username: userData.Username,
              Empresa: userData.Empresa,
            },
          });
          const localResource: ILocalResource = {
            name: resource.name,
            url: resource.url,
            type: resource.type,
            method: resource.method,
            // data: resource.data,
            localData: response.data,
          };

          dispatch(saveResource(localResource));
          resolve(localResource);
        }
      } catch (error) {
        console.error(error)
        reject(error);
      }
    });
  };
};
