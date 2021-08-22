import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { updateNetInfoState } from 'state/settings/actions';
import { store } from 'state/store/store';

NetInfo.addEventListener((netInfoState: NetInfoState) => {
  store.dispatch(updateNetInfoState(netInfoState));
})
