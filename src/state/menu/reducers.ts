/* import {CurrentUserState, USER_ACTIONS, UserAction, UserState} from './types';

const initialState: UserState = {
  userList: [],
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case USER_ACTIONS.FORGIVE_USER: {
      return {
        ...state,
      };
    }

    case USER_ACTIONS.SAVE_USER: {
      const {user, remember} = action.payload;

      return {
        ...state,
        userList: [
          ...state.userList.filter(suser => suser.Username !== user.Username),
          user,
        ],
        rememberUser: remember ? user : undefined,
      };
    }

    default:
      return state;
  }
};

const initialCurrentUserState: CurrentUserState = {
  user: undefined,
};

export const currentUserReducer = (
  state: CurrentUserState = initialCurrentUserState,
  action: UserAction,
): CurrentUserState => {
  switch (action.type) {
    case USER_ACTIONS.FORGIVE_USER: {
      return {
        user: undefined,
      };
    }

    case USER_ACTIONS.SAVE_USER: {
      const {user} = action.payload;

      return {
        user: user,
      };
    }

    default:
      return state;
  }
};
 */
