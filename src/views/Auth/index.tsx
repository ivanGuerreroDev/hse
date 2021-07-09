import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './components/signIn';
import forgotPassword from './components/forgotPassword';
import confirmPassRecovery from './components/confirmPassRecovery';
import endPassRecovery from './components/endPassRecovery';
import forceChangePass from './components/forceChangePass';

const Stack = createStackNavigator();

class Auth extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="forgotPassword" component={forgotPassword} />
        <Stack.Screen
          name="ConfirmPassRecovery"
          component={confirmPassRecovery}
        />
        <Stack.Screen name="EndPassRecovery" component={endPassRecovery} />
        <Stack.Screen name="ForceChangePass" component={forceChangePass} />
      </Stack.Navigator>
    );
  }
}

export default Auth;
