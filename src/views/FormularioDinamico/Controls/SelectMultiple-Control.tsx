import React from 'react';
import ControlComponent, {Props} from '../ControlComponent';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export default class TextControl extends ControlComponent {
  state = {
    selected: [],
    filter: '',
    accionc: [],
    onEdit: false,
    color: '',
    type: '',
  };

  onSelectedItemsChange = (accionc: any) => {
    this.setState({accionc});
  };

  render() {
    const {controlBridge} = this.props;

    const renderItem = (item: any) => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={15}
          />
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text
          style={{
            paddingHorizontal: 10,
            paddingBottom: 4,
            fontSize: 13,
            color: '#00000099',
            opacity: 1,
            fontFamily: 'Roboto-Regular',
            fontWeight: 'bold',
          }}>
          {`${controlBridge.property('title')}`}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={controlBridge.property('data')}
          labelField="label"
          valueField="value"
          placeholder={controlBridge.property('placeholder')}
          value={this.state.selected}
          onChange={item => {
            this.setState({selected: item});
            controlBridge.OutputValue = item;
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                <AntDesign color="black" name="delete" size={14} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {marginBottom: '7%'},
  dropdown: {
    marginHorizontal: 8,
    height: 40,
    borderBottomColor: '#0000001F',
    borderBottomWidth: 0.5,
    // height: 100,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 13,
  },
});
