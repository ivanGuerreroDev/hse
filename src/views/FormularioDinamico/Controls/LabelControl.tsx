import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { Input } from 'react-native-elements';
import { Text, View } from 'react-native';

export default class TextControl extends ControlComponent {
    constructor(props: Props) {
        super(props);

        props.controlBridge.requiredProperties.push('title');
    }

    render() {
        const { children, controlBridge } = this.props;

        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: controlBridge.property('ptop'),
                    paddingBottom: controlBridge.property('pbot'),
                    alignItems: controlBridge.property('aling'),
                    zIndex: 3
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        fontSize: controlBridge.property('fontSize'),
                        color: controlBridge.property('color'),
                        fontWeight: 'bold'
                    }}
                >
                    {controlBridge.property('title').includes('Nota')
                        ? controlBridge.property('title').split(' ')[1] === '1'
                            ? controlBridge
                                  .property('title')
                                  .replace('1', '1,0')
                            : controlBridge.property('title').split(' ')[1] ===
                              '2'
                            ? controlBridge
                                  .property('title')
                                  .replace('2', '2,0')
                            : controlBridge.property('title').split(' ')[1] ===
                              '3'
                            ? controlBridge
                                  .property('title')
                                  .replace('3', '3,0')
                            : controlBridge.property('title').split(' ')[1] ===
                              '4'
                            ? controlBridge
                                  .property('title')
                                  .replace('4', '4,0')
                            : controlBridge.property('title').split(' ')[1] ===
                              '5'
                            ? controlBridge
                                  .property('title')
                                  .replace('5', '5,0')
                            : controlBridge.property('title').replace('.', ',')
                        : controlBridge.property('title')}
                </Text>
                {children}
            </View>
        );
    }
}
