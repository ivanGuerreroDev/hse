import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
// @ts-ignore
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import thunk from 'redux-thunk';

import reducers from './reducers';

const storage = createSensitiveStorage({
  keychainService:
    '4y3u87BqTK7CgxDdgdhDvEfHtLl1XiD8XR1OdqpJTm62/1XkcKvD43Wk5/wc+3yA',
  sharedPreferencesName:
    '2rx1Q94+6DfSCVxuXDhPis0m7eMXS8Of1a7mnGlOvdSU1Kmzimh+cCpfvnOCG7IA',
});

const config = {
  key: 'root',
  storage,
  whitelist: [
    'inspeccion',
    'observacion',
    'capacitacion',
    'menus',
    'perfiles',
    'documentos',
    'formularios',
    'resources',
    'settings',
    'user',
  ],
};

const persisted = persistReducer(config, reducers);

export const store = createStore(persisted, applyMiddleware(thunk));
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
