import {combineReducers} from 'redux';

import {perfilReducer} from 'state/perfil/reducers';
import {menuReducer} from 'state/menu/reducers';
import {capacitacionReducer} from 'state/capacitacion/reducers';
import {observacionReducer} from 'state/observacion/reducers';
import {inspeccionReducer} from 'state/inspeccion/reducers';
import {
  documentosReducer,
  formulariosReducer,
  resourcesReducer,
} from '../formulariodinamico/reducers';
import {currentUserReducer, userReducer} from '../user/reducers';
import {netInfoStateReducer, settingsReducer} from 'state/settings/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  documentos: documentosReducer,
  formularios: formulariosReducer,
  netInfoState: netInfoStateReducer,
  resources: resourcesReducer,
  perfiles: perfilReducer,
  menus: menuReducer,
  capacitacion: capacitacionReducer,
  observacion: observacionReducer,
  inspeccion: inspeccionReducer,
  settings: settingsReducer,
  user: userReducer,
});
