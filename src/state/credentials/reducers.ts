import {CredentialsState, CredentialsAction, CREDENTIALS_ACTIONS} from './types';

const initialPerfilesState: CredentialsState = {
  credentials: [],
};

export const credentialsReducer = (
  state: CredentialsState = initialPerfilesState,
  action: CredentialsAction,
): CredentialsState => {
  switch (action.type) {
    case CREDENTIALS_ACTIONS.SAVE_CREDENTIALS:
      const {credentials} = action.payload;

      return {
        credentials: [
          ...state.credentials,
          credentials,
        ],
      };

    default:
      return state;
  }
};
