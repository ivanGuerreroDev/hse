import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootMainStackParamList } from 'types/navigations';

import { ControlBridge } from 'utils/formulariodinamico/ControlBridge';

export type Props = {
    controlBridge: ControlBridge;
    navigation: StackNavigationProp<
        RootMainStackParamList,
        'FormularioDinamico'
    >;
};

export default class ControlComponent extends Component<Props> {
    componentDidMount() {
        this.props.controlBridge.updateDevaultValue();
    }

    componentDidUpdate() {
        this.props.controlBridge.updateDevaultValue();
    }

    render() {
        const { children, controlBridge } = this.props;

        return (
            <View style={{ borderColor: 'black', borderWidth: 1 }}>
                <Text>
                    El control {controlBridge.Control.type} aún no se ha creado
                </Text>
                {children}
            </View>
        );
    }
}
