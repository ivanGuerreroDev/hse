import {AnyAction} from 'redux';
import {NetInfoState} from '@react-native-community/netinfo';

//#region State interface
//#endregion

//#region Actions interfaces

export interface UpdateNetInfoStateAction extends AnyAction {
  payload: NetInfoState;
}

//#endregion

//#region Combined actions interfaces type

export type NetInfoStateAction = UpdateNetInfoStateAction;

//#endregion

//#region Actions func types

export type UpdateNetInfoState = (netInfoState: NetInfoState) => UpdateNetInfoStateAction;

//#endregion

//#region Action type enum

export enum NETINFOSTATE_ACTIONS {
  UPDATE_NETINFOSTATE='UPDATE_NETINFOSTATE'
}

//#endregion
