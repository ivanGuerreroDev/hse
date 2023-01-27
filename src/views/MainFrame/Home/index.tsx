import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import 'utils/geolocation';

import Menu from './menu';
import Submenu from './menuSub';

const Stack = createStackNavigator();

const Home = (props: any) => {
    const MenuComp = (compProps: any) => <Menu {...props} {...compProps}/>
    const SubmenuComp = (compProps: any) => <Submenu {...props} {...compProps}/>
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Menu" component={MenuComp} />
            <Stack.Screen name="SubMenu" component={SubmenuComp} />
        </Stack.Navigator>
    );
}

export default Home;
