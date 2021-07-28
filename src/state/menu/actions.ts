import {
  USER_ACTIONS,
  ForgiveUser,
  ForgiveUserAction,
  User,
  SaveUser,
  SaveUserAction,
} from './types';

export const forgiveUser: ForgiveUser = (): ForgiveUserAction => {
  let action: ForgiveUserAction = {
    type: USER_ACTIONS.FORGIVE_USER,
  };

  return action;
};

export const saveUser: SaveUser = (user: User): SaveUserAction => {
  let action: SaveUserAction = {
    type: USER_ACTIONS.SAVE_USER,
    payload: {
      user: user,
    },
  };

  return action;
};
