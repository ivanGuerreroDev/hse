import {combineReducers} from 'redux';

import {perfilReducer} from 'state/perfil/reducers';
import {menuReducer} from 'state/menu/reducers';
import {
  documentosReducer,
  formulariosReducer,
  resourcesReducer,
} from '../formulariodinamico/reducers';
import {currentUserReducer, userReducer} from '../user/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  documentos: documentosReducer,
  formularios: formulariosReducer,
  resources: resourcesReducer,
  perfiles: perfilReducer,
  menus: menuReducer,
  user: userReducer,
});
