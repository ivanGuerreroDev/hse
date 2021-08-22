import {combineReducers} from 'redux';

import {perfilReducer} from 'state/perfil/reducers';
import {
  documentosReducer,
  formulariosReducer,
  resourcesReducer,
} from '../formulariodinamico/reducers';
import {currentUserReducer, userReducer} from '../user/reducers';
import { netInfoStateReducer, settingsReducer } from 'state/settings/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  documentos: documentosReducer,
  formularios: formulariosReducer,
  netInfoState: netInfoStateReducer,
  resources: resourcesReducer,
  perfiles: perfilReducer,
  settings: settingsReducer,
  user: userReducer,
});
