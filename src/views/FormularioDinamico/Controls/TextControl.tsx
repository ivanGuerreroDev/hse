import React from 'react';
import ControlComponent, {Props} from '../ControlComponent';
import {Modal, ScrollView, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {capitalize} from 'utils';
import {StyleSheet} from 'react-native';
export default class TextControl extends ControlComponent {
  state = {
    filter: '',
    onEdit: false,
    color: '',
    cargo: '',
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
      if (controlBridge.OutputValue !== controlBridge.property('data')) {
        controlBridge.OutputValue = controlBridge.property('data');
        return true;
      }
      return false;
    }
    return true;
  }

  render() {
    const {controlBridge, key} = this.props;
    let autoCompleteList: JSX.Element[] = ((controlBridge.property(
      'autocomplete',
    ) || []) as Array<string>)
      .filter(item =>
        item
          .toLowerCase()
          .includes(
            ((controlBridge.OutputValue as string) || '').toLowerCase(),
          ),
      )
      .map((item, index) => {
        const regexpResult =
          RegExp(
            `^(.*)(${((controlBridge.OutputValue as string) || '').replace(
              /[.*+?^${}()|[\]\\]/g,
              '\\$&',
            )})(.*)$`,
            'i',
          ).exec(capitalize(item, 3)) || [];
        return (
          <View style={{backgroundColor:"#fff"}}>
            <Text
              key={index}
              style={{paddingHorizontal: 10, paddingVertical: 8}}
              onPress={() => {
                controlBridge.OutputValue = item;
                this.setState({modalVisible: false});
                this.setState({onEdit: false});
              }}>
              <Text>{regexpResult[1]}</Text>
              <Text style={{fontWeight: 'bold'}}>{regexpResult[2]}</Text>
              <Text>{regexpResult[3]}</Text>
            </Text>
          </View>
        );
      });

    let errorMessage: string =
      controlBridge.property('validate') &&
      controlBridge.OutputValue !== undefined
        ? controlBridge.validateOutputValue() || ''
        : '';

    const errorHeight: number = errorMessage && !this.state.onEdit ? 15 : 0;

    let newData = controlBridge.property('data')
      ? controlBridge.property('data')
      : controlBridge.OutputValue;

    return !controlBridge.property('autocomplete') ? (
      <View style={{paddingBottom: 25 - errorHeight}}>
        <Input
          label={controlBridge.property('title')}
          placeholder={controlBridge.property('placeholder')}
          errorMessage={errorMessage}
          onChangeText={value => {
            (controlBridge.OutputValue = value), this.setState({onEdit: true});
          }}
          value={newData}
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
            fontFamily: 'Roboto-Regular'

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
      </View>
    ) : (
      <View>
        <Input
          label={controlBridge.property('title')}
          placeholder={controlBridge.property('placeholder')}
          errorMessage={errorMessage ? '- Este campo es requerido' : ''}
          onChangeText={value => {
            (controlBridge.OutputValue = value),
              this.setState({onEdit: true}),
              this.setState({modalVisible: true});
          }}
          value={newData}
          onBlur={() => {
            this.setState({onEdit: false});

            if (
              controlBridge
                .property('autocomplete')
                ?.filter((x: string) => x === controlBridge.OutputValue)
                .length == 0
            ) {
              controlBridge.OutputValue = '';
            }
          }}
          inputContainerStyle={{borderColor: '#0000001F', borderBottomWidth: 1}}
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
        {/* Visor del autocomplete */}
        <View style={{
          backgroundColor: '#ffffff',
          position: 'absolute',
          top: 60,     
          width: '100%',
          zIndex: 99,
          elevation: 99
        }}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            style={{
              width: '100%',
              maxHeight: this.state.onEdit ? 200 : 0,
            }}>
            {autoCompleteList}
          </ScrollView>
        </View>
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
