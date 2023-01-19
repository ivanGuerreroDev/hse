import { AnyAction } from 'redux';
import {
    GeolocationAction,
    GEOLOCATION_ACTIONS,
    NetInfoStateAction,
    NETINFOSTATE_ACTIONS,
    SettingsState
} from './types';
import {
    NetInfoCellularGeneration,
    NetInfoState,
    NetInfoStateType
} from '@react-native-community/netinfo';
import { GeolocationResponse } from '@react-native-community/geolocation';

const geolocationInitialState: GeolocationResponse = {
    coords: {
        latitude: NaN,
        longitude: NaN,
        altitude: null,
        accuracy: NaN,
        altitudeAccuracy: null,
        heading: null,
        speed: null
    },
    timestamp: NaN
};

export const geolocationReducer = (
    state: GeolocationResponse = geolocationInitialState,
    action: GeolocationAction
): GeolocationResponse => {
    switch (action.type) {
        case GEOLOCATION_ACTIONS.UPDATE_GEOLOCATION: {
            const geolocationResponse = action.payload;

            return geolocationResponse;
        }

        default:
            return state;
    }
};

const netInfoInitialState: NetInfoState = {
    type: NetInfoStateType.unknown,
    isConnected: null,
    isInternetReachable: null,
    details: null
};

export const netInfoStateReducer = (
    state: NetInfoState = netInfoInitialState,
    action: NetInfoStateAction
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
};

export const settingsReducer = (
    state: SettingsState = settingsInitialState,
    action: AnyAction
): SettingsState => {
    switch (action.type) {
        default:
            return state;
    }
};
