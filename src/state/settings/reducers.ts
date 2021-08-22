import { AnyAction } from 'redux';
import { NetInfoStateAction, NETINFOSTATE_ACTIONS, SettingsState } from './types';
import { NetInfoCellularGeneration, NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

const netInfoInitialState: NetInfoState = {
  type: NetInfoStateType.unknown,
  isConnected: null,
  isInternetReachable: null,
  details: null,
};

export const netInfoStateReducer = (
  state: NetInfoState = netInfoInitialState,
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

const settingsInitialState: SettingsState = {
  networkSettings: {
    allowedNetInfoStateTypes: [
      NetInfoStateType.wifi,
      NetInfoStateType.cellular
    ],
    allowedMinWifiStrength: 50,
    allowedMinCellularGeneration: NetInfoCellularGeneration['4g']
  }
}

export const settingsReducer = (
  state: SettingsState = settingsInitialState,
  action: AnyAction
): SettingsState => {
  switch (action.type) {
    default:
      return state;
  }
}
