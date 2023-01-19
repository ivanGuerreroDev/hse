import {
    USER_ACTIONS,
    ForgiveUser,
    ForgiveUserAction,
    IUser,
    SaveUser,
    SaveUserAction
} from './types';

export const forgiveUser: ForgiveUser = (): ForgiveUserAction => {
    let action: ForgiveUserAction = {
        type: USER_ACTIONS.FORGIVE_USER
    };

    return action;
};

export const saveUser: SaveUser = (
    user: IUser,
    remember: boolean
): SaveUserAction => {
    let action: SaveUserAction = {
        type: USER_ACTIONS.SAVE_USER,
        payload: {
            user: user,
            remember: remember
        }
    };

    return action;
};
