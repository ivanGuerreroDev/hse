import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import profile from './profile';
import changePass from './changePass';

const Stack = createStackNavigator();

class Profile extends Component {
    render() {
        return (
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="profile" component={profile} />
                <Stack.Screen name="changePass" component={changePass} />
            </Stack.Navigator>
        );
    }
}

export default Profile;
