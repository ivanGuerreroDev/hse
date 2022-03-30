import React from 'react';
import ControlComponent, {Props} from '../ControlComponent';
import {Input} from 'react-native-elements';
import {Text, View} from 'react-native';

export default class TextControl extends ControlComponent {
  constructor(props: Props) {
    super(props);

    props.controlBridge.requiredProperties.push('title');
  }

  render() {
    const {children, controlBridge} = this.props;

    return (
      <View style={{
              flex: 1,
              paddingTop: controlBridge.property('ptop'),
              paddingBottom: controlBridge.property('pbot'),
              alignItems: controlBridge.property('aling'),
            }}>
        <Text
          style={{
            flex: 1,
            fontSize: controlBridge.property('fontSize'),
            color: controlBridge.property('color'),
            fontWeight: 'bold'
            }}>
          {controlBridge.property('title').replace('.', ',')}
        </Text>
        {children}
      </View>
    );
  }
}
