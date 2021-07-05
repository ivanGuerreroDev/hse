import {combineReducers} from 'redux';

import {currentUserReducer, userReducer} from '../user/reducers';

export default combineReducers({
  currentUser: currentUserReducer,
  user: userReducer,
});
