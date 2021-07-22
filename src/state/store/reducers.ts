import {combineReducers} from 'redux';

import { formulariosReducer } from '../formulariodinamico/reducers';
import {currentUserReducer, userReducer} from '../user/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  formularios: formulariosReducer,
  user: userReducer,
});
