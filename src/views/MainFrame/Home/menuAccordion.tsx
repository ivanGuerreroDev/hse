import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  Accordion: any;
};

class MenuAccordion extends Component<Props> {
  state = {
    MenuAccordion: this.props.Accordion,
  };

  handleChange(id: string, expand: boolean) {
    let newArr = this.state.MenuAccordion.map((item: any, i: number) => {
      if (id === item.id) {
        return {...item, expand: !expand};
      } else {
        return item;
      }
    });
    this.setState({MenuAccordion: newArr});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.MenuAccordion.map((item: any, i: any) => (
          <ListItem.Accordion
            noIcon
            key={i}
            style={styles.subcontainer}
            containerStyle={{backgroundColor: '#808080'}}
            Component={TouchableScale}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.menuTitle}>
                    {item.menuPadre}
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={item.expand}
            onPress={() => {
              this.handleChange(item.id, item.expand);
            }}>
            {item.menuhijo.map((subitem: any, i: any) => (
              <ListItem
                key={i}
                Component={TouchableScale}
                style={styles.menusubcontainer}
                onPress={() => console.log('holi')}>
                <ListItem.Content>
                  <ListItem.Title style={styles.submenuTitle}>
                    {subitem.subtitulo}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ListItem.Accordion>
        ))}
      </View>
    );
  }
}

export default MenuAccordion;
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    marginHorizontal: 20,
  },
  subcontainer: {
    marginVertical: 10,
  },
  menusubcontainer: {
    marginVertical: 5,
  },
  menuTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderRadius: 5,
  },
  submenuTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#808080',
    fontWeight: 'bold',
    borderRadius: 5,
  },
});
