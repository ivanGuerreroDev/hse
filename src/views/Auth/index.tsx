import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './signIn';
import forgotPassword from './forgotPassword';
import confirmPassRecovery from './confirmPassRecovery';
import endPassRecovery from './endPassRecovery';
import forceChangePass from './forceChangePass';

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
