import {
  DEVICEINFO_ACTIONS,
  UpdateGeolocation,
  UpdateGeolocationAction,
  UpdateStaticDeviceInfo,
  UpdateStaticDeviceInfoAction
} from './types';
import { GeolocationInfo, StaticDeviceInfo } from 'types/deviceInfo';

export const updateStaticDeviceInfo: UpdateStaticDeviceInfo = (info: StaticDeviceInfo): UpdateStaticDeviceInfoAction => {
  let action: UpdateStaticDeviceInfoAction = {
    type: DEVICEINFO_ACTIONS.UPDATESTATICDEVICEINFO_DEVICE_INFO,
    payload: info
  };

  return action;
};

export const updateGeolocation: UpdateGeolocation = (geolocation: GeolocationInfo): UpdateGeolocationAction => {
  let action: UpdateGeolocationAction = {
    type: DEVICEINFO_ACTIONS.UPDATEGEOLOCATION_DEVICEINFO,
    payload: geolocation
  };

  return action;
}
