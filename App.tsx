import React, {Component} from 'react';
import {Platform,Keyboard,KeyboardEvent,KeyboardEventListener,EmitterSubscription,Dimensions,Animated} from 'react-native';
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
  keyboardWillShow: EmitterSubscription | undefined;
  keyboardWillHide: EmitterSubscription | undefined;
  state = {
    keyboardHeight: new Animated.Value(0)
  };
  constructor(props:any) {
    super(props);

    if (Platform.OS === 'ios') {
      this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow);
      this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.handleKeyboardWillHide);
    }
  }
  componentDidMount() {
    if (Platform.OS === 'android')
      RNBootSplash.hide({fade: true});
  }
  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShow?.remove();
      this.keyboardWillHide?.remove()
    }
  }

  handleKeyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
    const { height } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;

    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue: keyboardHeight,
        duration: 250,
        useNativeDriver: false
      }
    ).start();
  };

  handleKeyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(
      this.state.keyboardHeight,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }
    ).start();
  };

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
