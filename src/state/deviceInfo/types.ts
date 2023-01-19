import { AnyAction } from 'redux';
import { GeolocationInfo, StaticDeviceInfo } from 'utils/types/deviceInfo';
// import { NetInfoCellularGeneration, NetInfoStateType, NetInfoState} from '@react-native-community/netinfo';

//#region State interface

export interface DeviceInfoState {
    info: StaticDeviceInfo;
    geolocation: GeolocationInfo;
}

//#endregion

//#region Actions interfaces

export interface UpdateStaticDeviceInfoAction extends AnyAction {
    payload: StaticDeviceInfo;
}

export interface UpdateGeolocationAction extends AnyAction {
    payload: GeolocationInfo;
}

//#endregion

//#region Combined actions interfaces type

export type DeviceInfoAction =
    | UpdateStaticDeviceInfoAction
    | UpdateGeolocationAction;

//#endregion

//#region Actions func types

export type UpdateStaticDeviceInfo = (
    info: StaticDeviceInfo
) => UpdateStaticDeviceInfoAction;

export type UpdateGeolocation = (
    geolocation: GeolocationInfo
) => UpdateGeolocationAction;

//#endregion

//#region Action type enum

export enum DEVICEINFO_ACTIONS {
    UPDATESTATICDEVICEINFO_DEVICE_INFO = 'UPDATESTATICDEVICEINFO_DEVICE_INFO',
    UPDATEGEOLOCATION_DEVICEINFO = 'UPDATEGEOLOCATION_DEVICEINFO'
}

//#endregion
