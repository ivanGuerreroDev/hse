import { AnyAction } from 'redux';
import {
    DeviceInfoAction,
    DeviceInfoState,
    DEVICEINFO_ACTIONS,
    UpdateGeolocationAction,
    UpdateStaticDeviceInfoAction
} from './types';

const deviceInfoInitialState: DeviceInfoState = {
    info: undefined,
    geolocation: undefined
};

export const deviceInfoReducer = (
    state: DeviceInfoState = deviceInfoInitialState,
    action: DeviceInfoAction
): DeviceInfoState => {
    switch (action.type) {
        case DEVICEINFO_ACTIONS.UPDATESTATICDEVICEINFO_DEVICE_INFO: {
            const info = (action as UpdateStaticDeviceInfoAction).payload;

            return {
                ...state,
                info
            };
        }

        case DEVICEINFO_ACTIONS.UPDATEGEOLOCATION_DEVICEINFO: {
            const geolocation = (action as UpdateGeolocationAction).payload;

            return {
                ...state,
                geolocation
            };
        }

        default:
            return state;
    }
};
