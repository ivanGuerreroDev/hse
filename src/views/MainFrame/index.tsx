import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {
    BottomTabBarOptions,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { MainFrameStackParamList } from 'utils/types/navigations';

import Home from './Home';
import Documents from './Documents';
import Queries from './Notifications';
import Profile from './Profile';

const Tab = createBottomTabNavigator<MainFrameStackParamList>();

class MainFrame extends Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                backBehavior="initialRoute"
                tabBarOptions={tabBarOptions}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: (props) => (
                            <View style={styles.view}>
                                {/* <Icon type="metarial" name="category" color={props.color} /> */}
                                <Image
                                    source={
                                        !props.focused
                                            ? require('components/Assets/DownMenu/modulos.png')
                                            : require('components/Assets/DownMenu/mod_color.png')
                                    }
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                {props.focused && (
                                    <Text style={{ fontSize: 12 }}>
                                        {'Módulos'}
                                    </Text>
                                )}
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Documents"
                    component={Documents}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: (props) => (
                            <View style={styles.viewDocs}>
                                {/* <Icon type="feather" name="file-text" color={props.color} /> */}
                                <Image
                                    source={
                                        !props.focused
                                            ? require('components/Assets/DownMenu/documentos.png')
                                            : require('components/Assets/DownMenu/documentos_color.png')
                                    }
                                    style={styles.iconDocs}
                                    resizeMode="contain"
                                />
                                {props.focused && (
                                    <Text
                                        style={{ fontSize: 12, paddingTop: 5 }}
                                    >
                                        {'Documentos'}
                                    </Text>
                                )}
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={Queries}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: (props) => (
                            <View style={styles.viewNot}>
                                {/* <Icon type="feather" name="file-text" color={props.color} /> */}
                                <Image
                                    source={
                                        !props.focused
                                            ? require('components/Assets/DownMenu/notificaciones.png')
                                            : require('components/Assets/DownMenu/notificaciones_color.png')
                                    }
                                    style={styles.iconNot}
                                    resizeMode="contain"
                                />
                                {props.focused && (
                                    <Text
                                        style={{ fontSize: 12, paddingTop: 5 }}
                                    >
                                        {'Notificaciones'}
                                    </Text>
                                )}
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: (props) => (
                            <View style={styles.viewNot}>
                                {/* <Icon type="metarial" name="person" color={props.color} /> */}
                                <Image
                                    source={
                                        !props.focused
                                            ? require('components/Assets/DownMenu/perfil.png')
                                            : require('components/Assets/DownMenu/perfil_color.png')
                                    }
                                    style={styles.iconNot}
                                    resizeMode="contain"
                                />
                                {props.focused && (
                                    <Text
                                        style={{ fontSize: 12, paddingTop: 5 }}
                                    >
                                        {'Perfil'}
                                    </Text>
                                )}
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        );
    }
}

const tabBarOptions: BottomTabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: '#FDAE01',
    inactiveTintColor: '#000000',
    style: {
        height: 76
    }
};

export default MainFrame;

const styles = StyleSheet.create({
    view: {
        paddingTop: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 31,
        width: 30,
        alignItems: 'center'
    },
    viewDocs: {
        paddingTop: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconDocs: {
        height: 25,
        width: 25,
        alignItems: 'center'
    },
    viewNot: {
        paddingTop: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconNot: {
        height: 25,
        width: 25,
        alignItems: 'center'
    }
});
