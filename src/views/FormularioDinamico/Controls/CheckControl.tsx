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

    const options = (controlBridge.property('options') as []).map((option: any, index) => {
      const selectionStyle = {
        opacity: option.code === controlBridge.OutputValue?.code ? 1 : 0.6
      }

      return (
        <View key={index} style={{flex: 1, paddingHorizontal: 20}}>
          <Button
            onPress={() => {controlBridge.OutputValue = {code: option.code, value: option.value}}}
            title={option.label ?? ''}
            icon={option.icon ? <Icon type='material' name={option.icon} color='white'/> : undefined}
            buttonStyle={{
              backgroundColor: option.color ?? '#FDAE01'
            }}
            containerStyle={selectionStyle}/>
        </View>
      );
    });

    return (
      <View style={{flex: 1, paddingTop: 2, paddingBottom: 10}}>
        <Text style={{flex: 1, fontSize: 16, color: '#808080'}}>{controlBridge.property('label')}</Text>
        <View style={{flexGrow: 0, flexBasis: 1, flexDirection: 'row', marginHorizontal: -20}}>
          {options}
        </View>
        {children}
      </View>
    );
  }
}
