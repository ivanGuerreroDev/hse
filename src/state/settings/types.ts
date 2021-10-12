import {AnyAction} from 'redux';
import { NetInfoCellularGeneration, NetInfoStateType, NetInfoState} from '@react-native-community/netinfo';
import { GeolocationResponse } from '@react-native-community/geolocation';

//#region State interface

export interface NetworkSettings {
  allowedNetInfoStateTypes: NetInfoStateType[];
  allowedMinWifiStrength?: number;
  allowedMinCellularGeneration?: NetInfoCellularGeneration;
};

export interface SettingsState {
  networkSettings: NetworkSettings
}

//#endregion

//#region Actions interfaces

export interface UpdateNetInfoStateAction extends AnyAction {
  payload: NetInfoState;
}

export interface UpdateGeolocationAction extends AnyAction {
  payload: GeolocationResponse;
}

//#endregion

//#region Combined actions interfaces type

export type NetInfoStateAction = UpdateNetInfoStateAction;
export type GeolocationAction = UpdateGeolocationAction;

//#endregion

//#region Actions func types

export type UpdateNetInfoState = (netInfoState: NetInfoState) => UpdateNetInfoStateAction;
export type UpdateGeolocation = (geolocation: GeolocationResponse) => UpdateGeolocationAction;

//#endregion

//#region Action type enum

export enum NETINFOSTATE_ACTIONS {
  UPDATE_NETINFOSTATE='UPDATE_NETINFOSTATE'
}

export enum GEOLOCATION_ACTIONS {
  UPDATE_GEOLOCATION='UPDATE_GEOLOCATION'
}

//#endregion
