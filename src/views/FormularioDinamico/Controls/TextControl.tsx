import React from 'react';
import ControlComponent from '../ControlComponent';
import {ScrollView, View} from 'react-native';
import {Input, Text} from 'react-native-elements';

export default class TextControl extends ControlComponent {
  state = {
    onEdit: false,
  };

  render() {
    const {controlBridge} = this.props;

    let autoCompleteList: JSX.Element[] = (
      (controlBridge.property('autocomplete') || []) as Array<string>
    )
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
          ).exec(item) || [];

        return (
          <Text
            key={index}
            style={{padding: 2, textDecorationLine: 'underline'}}
            onPress={() => {
              controlBridge.OutputValue = item;
              this.setState({onEdit: false});
            }}>
            <Text>{regexpResult[1]}</Text>
            <Text style={{fontWeight: 'bold'}}>{regexpResult[2]}</Text>
            <Text>{regexpResult[3]}</Text>
          </Text>
        );
      });

    let errorMessage: string =
      controlBridge.property('validate') &&
      controlBridge.OutputValue !== undefined
        ? controlBridge.validateOutputValue() || ''
        : '';

    const errorHeight: number = errorMessage && !this.state.onEdit ? 20 : 0;
    return (
      <View style={{paddingBottom: 25 - errorHeight}}>
        <Input
          label={controlBridge.property('title')}
          placeholder={controlBridge.property('placeholder')}
          errorMessage={errorMessage}
          onChangeText={value => {
            (controlBridge.OutputValue = value), this.setState({onEdit: true});
          }}
          value={controlBridge.OutputValue}
          onBlur={() => {
            this.setState({onEdit: false});
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
          }}
          errorStyle={{
            paddingTop: 0,
            marginTop: 1,
            marginBottom: '2%',
            height: errorHeight,
          }}
          placeholderTextColor="#00000061"
          editable={!controlBridge.ReadOnly}
        />

        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            style={{
              position: 'absolute',
              left: '10%',
              top: 0,
              backgroundColor: 'white',
              zIndex: 999,
              width: '80%',
              maxHeight: this.state.onEdit ? 125 : 0,
            }}>
            {autoCompleteList}
          </ScrollView>
        </View>
      </View>
    );
  }
}
