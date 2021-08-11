import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  /* title: any;
  navigate: any; */
  /*   key: any; */
  List: any;
};

class MenuList extends Component<Props> {
  render() {
    console.log(this.props.List);
    return (
      <View style={styles.container}>
        {this.props.List.map((item: any, i: any) => (
          <ListItem
            key={i}
            Component={TouchableScale}
            style={styles.contentMenu}
            onPress={() => console.log(item.navigate)}>
            <ListItem.Content>
              <ListItem.Title style={styles.menuTitle}>
                {item.titulo}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    );
  }
}

export default MenuList;
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
  },
  contentMenu: {
    paddingTop: 15,
    borderRadius: 5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: '#0000003D',
    alignItems: 'center',
  },
  menuTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#808080',
    fontWeight: 'bold',
    borderRadius: 5,
  },
});
