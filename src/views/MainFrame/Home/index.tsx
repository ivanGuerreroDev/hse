import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import 'utils/geolocation';

import menu from './menu';
import submenu from './menuSub';

const Stack = createStackNavigator();

class Home extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Menu" component={menu} />
        <Stack.Screen name="SubMenu" component={submenu} />
      </Stack.Navigator>
    );
  }
}

export default Home;
