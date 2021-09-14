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
      <View style={{flex: 1, paddingTop: 2, paddingBottom: 10}}>
        <Text
          style={{flex: 1, fontSize: 18, color: '#FDAE01', fontWeight: 'bold'}}>
          {controlBridge.property('title')}
        </Text>
        {children}
      </View>
    );
  }
}
