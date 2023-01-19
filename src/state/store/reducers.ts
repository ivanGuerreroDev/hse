import { combineReducers } from 'redux';

import { perfilReducer } from 'state/perfil/reducers';
import { menuReducer } from 'state/menu/reducers';
import { capacitacionReducer } from 'state/capacitacion/reducers';
import { observacionReducer } from 'state/observacion/reducers';
import { inspeccionReducer } from 'state/inspeccion/reducers';
import {
    documentosReducer,
    formulariosReducer,
    resourcesReducer
} from '../formulariodinamico/reducers';
import { currentUserReducer, userReducer } from '../user/reducers';
import {
    geolocationReducer,
    netInfoStateReducer,
    settingsReducer
} from 'state/settings/reducers';
import {
    pendingManagerReducer,
    sendingManagerReducer
} from 'state/sendingManager/reducers';
import { deviceInfoReducer } from 'state/deviceInfo/reducers';

export default combineReducers({
    currentUser: currentUserReducer,
    deviceInfo: deviceInfoReducer,
    documentos: documentosReducer,
    formularios: formulariosReducer,
    geolocation: geolocationReducer,
    netInfoState: netInfoStateReducer,
    resources: resourcesReducer,
    perfiles: perfilReducer,
    menus: menuReducer,
    capacitacion: capacitacionReducer,
    observacion: observacionReducer,
    inspeccion: inspeccionReducer,
    pendingManager: pendingManagerReducer,
    sendingManager: sendingManagerReducer,
    settings: settingsReducer,
    user: userReducer
});
