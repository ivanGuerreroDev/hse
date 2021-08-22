import { NETINFOSTATE_ACTIONS, UpdateNetInfoState, UpdateNetInfoStateAction } from './types';
import { NetInfoState } from '@react-native-community/netinfo';

export const updateNetInfoState: UpdateNetInfoState = (netInfoState: NetInfoState): UpdateNetInfoStateAction => {
  let action: UpdateNetInfoStateAction = {
    type: NETINFOSTATE_ACTIONS.UPDATE_NETINFOSTATE,
    payload: netInfoState
  };

  return action;
};
