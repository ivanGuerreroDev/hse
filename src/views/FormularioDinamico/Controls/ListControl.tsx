import React from 'react';
import ControlComponent, { Props } from '../ControlComponent';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ListControlModalProps = {
  data: Array<any>;
  onSuccess: (output: any) => void;
  selectedData: any;
  displayField?: string;
};

class ListControlModal extends React.Component<ListControlModalProps> {
  state = {
    searchText: ''
  };

  render() {
    const { data, onSuccess, selectedData, displayField } = this.props;

    const filteredData = data
      .filter(item => (displayField ? item[displayField] : item).toLowerCase().includes(this.state.searchText.toLowerCase()));

    return (
      <SafeAreaView style={{flex: 1}}>
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
            const selected: boolean = (displayField ? item[displayField] : item) === selectedData;

            return <View style={{padding: 2, width: '100%'}}>
              <Text
                onPress={() => onSuccess(item)}
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderColor: selected ? 'cyan' : 'grey',
                  borderRadius: 6,
                  padding: 5
                }}>
                <Text>{regexpResult[1]}</Text>
                <Text style={{fontWeight: 'bold'}}>{regexpResult[2]}</Text>
                <Text>{regexpResult[3]}</Text>
              </Text>
            </View>
          }}/>
        <TextInput style={{flex: 0}}
          autoFocus={true}
          value={this.state.searchText}
          onChangeText={(value) => this.setState({searchText: value})}/>
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
          )}
          style={{fontSize: 18, minHeight: 40, borderColor: '#0000001F', borderBottomWidth: 1, paddingVertical: 5}}>
          {(controlBridge.property('displayfield') ? controlBridge.OutputValue?.[controlBridge.property('displayfield')] : controlBridge.OutputValue) || controlBridge.property('placeholder') || ''}
        </Text>
      </View>
    );
  }
}
