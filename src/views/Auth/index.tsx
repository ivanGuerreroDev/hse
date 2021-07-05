import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './SignIn';
import forgotPassword from './forgotPassword';

const Stack = createStackNavigator();

class Auth extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="forgotPassword" component={forgotPassword} />
      </Stack.Navigator>
    );
  }
}

export default Auth;
