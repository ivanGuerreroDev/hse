import { NetInfoStateAction, NETINFOSTATE_ACTIONS } from './types';
import { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

const initialState: NetInfoState = {
  type: NetInfoStateType.unknown,
  isConnected: null,
  isInternetReachable: null,
  details: null,
};

export const netInfoStateReducer = (
  state: NetInfoState = initialState,
  action: NetInfoStateAction,
): NetInfoState => {
  switch (action.type) {
    case NETINFOSTATE_ACTIONS.UPDATE_NETINFOSTATE: {
      const netInfoState = action.payload;

      return netInfoState;
    }

    default:
      return state;
  }
};
