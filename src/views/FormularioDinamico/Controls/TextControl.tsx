import React from 'react';
import ControlComponent, {Props} from '../ControlComponent';
import {ScrollView, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {capitalize} from 'utils';

export default class TextControl extends ControlComponent {
  state = {
    filter: '',
    onEdit: false,
    color: '',
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
    const {controlBridge} = this.props;

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
          <Text
            key={index}
            style={{paddingHorizontal: 10, paddingVertical: 8}}
            onPress={() => {
              controlBridge.OutputValue = item;
              this.setState({onEdit: false});
            }}>
            <Text>{regexpResult[1]}</Text>
            <Text style={{fontWeight: 'bold'}}>{regexpResult[4]}</Text>
            <Text>{regexpResult[3]}</Text>
          </Text>
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

      console.log('******************************');
      console.log(controlBridge.property('title'), controlBridge.property('autocomplete') != undefined && controlBridge.property('autocomplete')?.filter((x: string) => x === controlBridge.OutputValue))


    return (
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

            controlBridge.property('autocomplete') != undefined && controlBridge.property('autocomplete')?.filter((x: string) => x === controlBridge.OutputValue)
              ? controlBridge.OutputValue = ''
              : controlBridge.OutputValue
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
        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            style={{
              position: 'absolute',
              top: 0,
              backgroundColor: 'white',
              zIndex: 999,
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
