import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import menu from './components/menu';
import capacitaciones from './components/Capacitaciones';
import observaciones from './components/Observaciones';
import inspecciones from './components/Inspecciones';

const Stack = createStackNavigator();

class Home extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Menu" component={menu} />
        <Stack.Screen name="Capacitaciones" component={capacitaciones} />
        <Stack.Screen name="Observaciones" component={observaciones} />
        <Stack.Screen name="Inspecciones" component={inspecciones} />
      </Stack.Navigator>
    );
  }
}

export default Home;
