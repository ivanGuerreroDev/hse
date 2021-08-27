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

/* class MenuList extends Component<Props> { */
const MenuList = ({List}: Props) => {
  console.log(List);

  return (
    <View style={styles.container}>
      {List[0].map((item: any, i: any) => (
        <ListItem
          key={i}
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
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
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20,
  },
  contentMenu: {
    paddingTop: 15,
    borderRadius: 5,
    borderBottomWidth: 0.7,
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
