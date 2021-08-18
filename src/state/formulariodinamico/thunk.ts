import axios, { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import Config from 'react-native-config';
import { saveFormulario } from './actions';
import { IFormulario } from 'types/formulariodinamico';
import { SaveFormularioAction, SaveFormularioAsync, SaveFormularioAsyncThunk } from './types';

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
