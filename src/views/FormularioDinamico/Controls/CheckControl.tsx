import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';

export default class CheckControl extends ControlComponent {
    constructor(props: Props) {
        super(props);

        props.controlBridge.requiredProperties.push('label', 'options');
    }

    render() {
        const { children, controlBridge } = this.props;

        const options = (controlBridge.property('options') as []).map(
            (option: any, index) => {
                const selectionStyle = {
                    opacity:
                        option.code === controlBridge.OutputValue?.code
                            ? 1
                            : 0.3
                };

                return (
                    <View
                        key={index}
                        style={{
                            flex: 1,
                            paddingHorizontal: 15,
                            paddingTop: 5
                        }}
                    >
                        <Button
                            onPress={() => {
                                controlBridge.OutputValue = {
                                    code: option.code,
                                    value: option.value
                                };
                            }}
                            title={option.label ?? ''}
                            icon={
                                option.icon ? (
                                    <Icon
                                        type="material"
                                        name={option.icon}
                                        color="white"
                                    />
                                ) : undefined
                            }
                            buttonStyle={{
                                backgroundColor: option.color ?? '#FDAE01'
                            }}
                            disabledStyle={{
                                backgroundColor: option.color ?? '#FDAE01'
                            }}
                            titleStyle={{
                                color: 'white'
                            }}
                            disabledTitleStyle={{
                                color: 'white'
                            }}
                            containerStyle={selectionStyle}
                            disabled={controlBridge.ReadOnly}
                        />
                    </View>
                );
            }
        );

        return (
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 12 }}>
                <Text
                    style={{
                        flex: 1,
                        fontSize: 15,
                        color: '#00000099',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Medium',
                        paddingBottom: 5
                    }}
                >
                    {controlBridge.property('label')}
                </Text>
                <View
                    style={{
                        flexGrow: 0,
                        flexBasis: 1,
                        flexDirection: 'row',
                        marginHorizontal: -20
                    }}
                >
                    {options}
                </View>
                {children}
            </View>
        );
    }
}
