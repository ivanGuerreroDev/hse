import NetInfo, { NetInfoCellularGeneration, NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import { updateNetInfoState } from 'state/settings/actions';
import { RootState, store } from 'state/store/store';
import { NetworkSettings } from 'state/settings/types';
import { Platform } from 'react-native';

NetInfo.addEventListener((netInfoState: NetInfoState) => {
  store.dispatch(updateNetInfoState(netInfoState));
})

export const isNetworkAllowed = (): boolean => {
  const state: RootState = store.getState();
  const netInfoState: NetInfoState = state.netInfoState;
  const networkSettings: NetworkSettings = state.settings.networkSettings;

  if (Platform.OS === "ios" && netInfoState.type === NetInfoStateType.wifi)
    netInfoState.details.strength = 100;

  return (
    (
      (netInfoState.isConnected ?? false) && (netInfoState.isInternetReachable ?? false) &&
      networkSettings.allowedNetInfoStateTypes.includes(netInfoState.type)
    ) &&
    (
      netInfoState.type === NetInfoStateType.wifi &&
      (netInfoState.details.strength || 0) >= (networkSettings.allowedMinWifiStrength || 0) ||
      netInfoState.type === NetInfoStateType.cellular &&
      parseInt((netInfoState.details.cellularGeneration || NetInfoCellularGeneration['2g']).replace('g', '')) >=
      parseInt((networkSettings.allowedMinCellularGeneration || NetInfoCellularGeneration['2g']).replace('g', '')) ||
      (netInfoState.type !== NetInfoStateType.wifi && netInfoState.type !== NetInfoStateType.cellular)
    )
  )
};

export const isNetworkMounted = (): boolean => {
  return store.getState().netInfoState.isInternetReachable !== null;
}
