import {
    GEOLOCATION_ACTIONS,
    NETINFOSTATE_ACTIONS,
    UpdateGeolocation,
    UpdateGeolocationAction,
    UpdateNetInfoState,
    UpdateNetInfoStateAction
} from './types';
import { NetInfoState } from '@react-native-community/netinfo';
import { GeolocationResponse } from '@react-native-community/geolocation';

export const updateNetInfoState: UpdateNetInfoState = (
    netInfoState: NetInfoState
): UpdateNetInfoStateAction => {
    let action: UpdateNetInfoStateAction = {
        type: NETINFOSTATE_ACTIONS.UPDATE_NETINFOSTATE,
        payload: netInfoState
    };

    return action;
};

export const updateGeolocation: UpdateGeolocation = (
    geolocation: GeolocationResponse
): UpdateGeolocationAction => {
    let action: UpdateGeolocationAction = {
        type: GEOLOCATION_ACTIONS.UPDATE_GEOLOCATION,
        payload: geolocation
    };

    return action;
};
