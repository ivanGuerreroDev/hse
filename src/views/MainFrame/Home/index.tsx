import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import menu from './components/menu';

const Stack = createStackNavigator();

class Home extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Menu" component={menu} />
      </Stack.Navigator>
    );
  }
}

export default Home;
