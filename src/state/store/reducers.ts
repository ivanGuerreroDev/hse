import {combineReducers} from 'redux';

import { formulariosReducer, resourcesReducer } from '../formulariodinamico/reducers';
import {currentUserReducer, userReducer} from '../user/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  formularios: formulariosReducer,
  resources: resourcesReducer,
  user: userReducer,
});
