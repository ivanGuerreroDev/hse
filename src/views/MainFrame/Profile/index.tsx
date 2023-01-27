import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './profile';
import ChangePass from './changePass';

const Stack = createStackNavigator();
type Props = {
    app: String
}
class ProfileView extends Component<Props> {
    render() {
        return (
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="profile" component={(compProps) => <Profile {...this.props} {...compProps} />} />
                <Stack.Screen name="changePass" component={(compProps) => <ChangePass {...this.props} {...compProps} />} />
            </Stack.Navigator>
        );
    }
}

export default ProfileView;
