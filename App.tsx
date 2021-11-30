import React, {Component} from 'react';
import {Platform} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'state/store/store';
import RNBootSplash from 'react-native-bootsplash';
import Index from 'index';
import {lightTheme} from 'components/Theme/theme';
import 'utils/network';
import 'utils/sendingManager';

class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android')
      RNBootSplash.hide({fade: true});
      console.disableYellowBox = true
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
