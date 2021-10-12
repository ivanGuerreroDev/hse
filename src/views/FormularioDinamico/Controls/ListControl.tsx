import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { FlatList, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';

type ListControlModalProps = {
  data: Array<any>;
  onSuccess: (output: any) => void;
  selectedData: any;
  displayField?: string;
  multiple?: boolean;
};

class ListControlModal extends React.Component<ListControlModalProps> {
  state: {
    searchText: string,
    selectedData: Array<any>
  } = {
    searchText: '',
    selectedData: []
  };

  constructor(props: ListControlModalProps) {
    super(props);

    if (props.selectedData)
      this.state.selectedData = props.multiple ? props.selectedData : [props.selectedData];
  }

  render() {
    const { data, onSuccess, displayField, multiple } = this.props;

    const filteredData = data
      .filter(item => !this.state.selectedData.find(data => _.isEqual(data, item)))
      .filter(item => (displayField ? item[displayField] : item).toLowerCase().includes(this.state.searchText.toLowerCase()));

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 0}}>
          <Text style={{color: '#86939e', fontSize: 16, fontWeight: 'bold'}}>Seleccionado</Text>
          <FlatList
            data={this.state.selectedData}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps='always'
            style={{marginBottom: 10, borderColor: 'grey', borderBottomWidth: 1, minHeight: 28, maxHeight: 160}}
            renderItem={({item}) =>
              <View style={{padding: 2, width: '100%'}}>
                <Text
                  onPress={() => multiple ? this.setState({
                      selectedData: this.state.selectedData
                        .filter(data => data !== item)
                    }): onSuccess(undefined)}
                  style={{
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: 'cyan',
                    borderRadius: 6,
                    padding: 5
                  }}>
                  {displayField ? item[displayField] : item}
                </Text>
              </View>
            }/>
        </View>
        <Text style={{color: '#86939e', fontSize: 16, fontWeight: 'bold', flex: 0}}>Selecione</Text>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps='always'
          style={{flex: 1}}
          renderItem={({item}) => {
            const regexpResult = RegExp(
              `^(.*)(${this.state.searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(.*)$`, 'i'
            ).exec(displayField ? item[displayField] : item) || [];

            return <View style={{padding: 2, width: '100%'}}>
              <Text
                onPress={() => multiple ? this.setState({selectedData: [...this.state.selectedData, item]}) : onSuccess(item)}
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: 'grey',
                  borderRadius: 6,
                  padding: 5
                }}>
                <Text>{regexpResult[1]}</Text>
                <Text style={{fontWeight: 'bold'}}>{regexpResult[2]}</Text>
                <Text>{regexpResult[3]}</Text>
              </Text>
            </View>
          }}/>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <TextInput
            style={{flex: 1}}
            autoFocus={true}
            value={this.state.searchText}
            onChangeText={(value) => this.setState({searchText: value})}
            />
          <Icon name='check-circle' type= 'material' color='green'
            size={multiple ? 32 : 0}
            onPress={() => onSuccess(this.state.selectedData.length > 0 ? this.state.selectedData : undefined)}/>
        </View>
      </SafeAreaView>
    );
  }
}

export default class ListControl extends ControlComponent {
  constructor(props: Props) {
    super(props);

    props.controlBridge.requiredProperties.push('data');
  }

  render() {
    const { controlBridge, navigation } = this.props;

    let selectedValues: Array<any> | undefined;
    if (controlBridge.OutputValue)
      selectedValues = controlBridge.property('multiple') ? controlBridge.OutputValue : [controlBridge.OutputValue];
    else
      selectedValues = undefined;



     return (
      <View style={{width: '100%', paddingHorizontal: 10, paddingBottom: 25}}>
        <Text
          style={{color: '#86939e', fontSize: 16, fontWeight: 'bold'}}>
          {controlBridge.property('title')}
        </Text>
        <Text
          onPress={() => !controlBridge.ReadOnly && navigation.navigate(
            'Modal',
            <ListControlModal
              data={controlBridge.property('data')}
              onSuccess={(output) => { controlBridge.OutputValue = output; navigation.goBack()}}
              selectedData={controlBridge.OutputValue}
              displayField={controlBridge.property('displayfield')}
              multiple={controlBridge.property('multiple')}/>
          )}
          style={{fontSize: 18, minHeight: 40, borderColor: '#0000001F', borderBottomWidth: 1, paddingVertical: 5}}>
          {selectedValues
            ?.map(selectedValue => (controlBridge.property('displayfield') ? selectedValue[controlBridge.property('displayfield')] : selectedValue))
            .join('\n') || controlBridge.property('placeholder') || ''}
        </Text>
      </View>
    );
  }
}
