import {SaveCredentials, SaveCredentialsAction, CREDENTIALS_ACTIONS} from './types';
import { ICredentials } from 'utils/types/credentials';

export const saveCredentials: SaveCredentials = (credentials: ICredentials): SaveCredentialsAction => {
  let action: SaveCredentialsAction = {
    type: CREDENTIALS_ACTIONS.SAVE_CREDENTIALS,
    payload: {
      credentials,
    },
  };

  return action;
};
