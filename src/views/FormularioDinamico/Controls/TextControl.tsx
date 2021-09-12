import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { Input } from 'react-native-elements';

export default class TextControl extends ControlComponent {
  constructor(props: Props) {
    super(props);

    props.controlBridge.requiredProperties.push('title');
  }

  render() {
    const { controlBridge } = this.props;

    return (
      <Input
        placeholder={controlBridge.property('title')}
        onChangeText={(value) => controlBridge.OutputValue = value}
        value={controlBridge.OutputValue}
        inputContainerStyle={{borderColor: '#0000001F', borderBottomWidth: 1}} placeholderTextColor='#00000061'
        editable={!controlBridge.ReadOnly}/>
    );
  }
}
