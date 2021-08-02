import React, {Component} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'state/store/store';
import RNBootSplash from 'react-native-bootsplash';
import Index from 'index';
import {lightTheme} from 'components/Theme/theme';

class App extends Component {
  componentDidMount() {
    RNBootSplash.hide({fade: true});
  }
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={lightTheme}>
            <Index />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    );
  }
}

export default App;
