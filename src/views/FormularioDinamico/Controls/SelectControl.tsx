import React from 'react';
import ControlComponent, {Props} from '../ControlComponent';
import {Modal, ScrollView, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {capitalize} from 'utils';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

export default class TextControl extends ControlComponent {
  state = {
    filter: '',
    onEdit: false,
    color: '',
    type: '',
  };

  constructor(props: Props) {
    super(props);
    props.controlBridge.OutputValue = props.controlBridge.property('data')
      ? props.controlBridge.property('data')
      : props.controlBridge.OutputValue;
  }
  /**
   * controla la renderizacion del componente al traer la propiedad data
   * @returns bolean
   */
  shouldComponentUpdate() {
    const {controlBridge} = this.props;

    if (controlBridge.property('data')) {
      if (controlBridge.property('data')?.split(', ').length == 1) {
        if (controlBridge.OutputValue !== controlBridge.property('data')) {
          controlBridge.OutputValue = controlBridge.property('data');
          return true;
        }
        return false;
      }
    }
    return true;
  }

  render() {
    const {controlBridge} = this.props;

    let errorMessage: string =
      controlBridge.property('validate') &&
      controlBridge.OutputValue !== undefined
        ? controlBridge.validateOutputValue() || ''
        : '';

    const errorHeight: number = errorMessage && !this.state.onEdit ? 15 : 0;

    let multi_cargo =
      controlBridge.property('title').includes('Cargo') &&
      controlBridge.property('data')?.split(', ');

    return (
      <View style={{paddingBottom: 25 - errorHeight}}>
        {multi_cargo?.length > 1 ? (
          <>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 13,
                color: '#00000099',
                opacity: 1,
                fontFamily: 'Roboto-Regular',
                fontWeight: 'bold',
              }}>
              {`${controlBridge.property('title')}`}
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              value={controlBridge.OutputValue}
              data={controlBridge.property('data_select')}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Seleccione..."
              onChange={item => {
                controlBridge.OutputValue = item.value;
              }}
            />
          </>
        ) : (
          <Input
            label={controlBridge.property('title')}
            placeholder={controlBridge.property('placeholder')}
            errorMessage={errorMessage}
            onChangeText={value => {
              controlBridge.OutputValue = value;
            }}
            value={controlBridge.property('data')}
            onBlur={() => {
              this.setState({onEdit: false});
            }}
            inputContainerStyle={{
              borderColor: '#0000001F',
              borderBottomWidth: 1,
            }}
            labelStyle={{
              fontSize: 13,
              color: '#00000099',
              opacity: 1,
              fontFamily: 'Roboto-Regular',
            }}
            inputStyle={{
              paddingVertical: 5,
              fontSize: 15,
              fontFamily: 'Roboto-Medium',
              backgroundColor: controlBridge.property('color'),
              borderRadius: 5,
            }}
            errorStyle={{
              paddingTop: 0,
              marginTop: 1,
              marginBottom: '2%',
              height: errorHeight,
            }}
            placeholderTextColor="#00000061"
            editable={
              !controlBridge.property('editable')
                ? false
                : !controlBridge.ReadOnly
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    marginHorizontal: 13,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    marginLeft: 5,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
