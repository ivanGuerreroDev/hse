import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  Accordion: any;
};

class MenuAccordion extends Component<Props> {
  state = {
    MenuAccordion: Object.keys(
      this.props.Accordion.reduce((a: any, e: any) => {
        let groupByKeyName = e['Tipos'];
        (a[groupByKeyName]
          ? a[groupByKeyName]
          : (a[groupByKeyName] = null || [])
        ).push(e);
        return a;
      }, {}),
    ).map(
      (abuelo, i) =>
        abuelo && {
          Tipo: abuelo,
          Id: this.props.Accordion.find((x: any) => x.Tipos === abuelo).Id,
          expand: false,
          menuhijo: this.props.Accordion.filter(
            (x: any) => x.Tipos === abuelo,
          ).map((x: any) => x.Inspecciones),
        },
    ),
  };

  handleChange(id: string, expand: boolean) {
    let newArr = this.state.MenuAccordion.map((item: any) => {
      if (id === item.Id) {
        return {...item, expand: !expand};
      } else {
        return item;
      }
    });
    this.setState({MenuAccordion: newArr});
  }

  render() {
    console.log('component', this.state.MenuAccordion);
    return (
      <View style={styles.container}>
        {this.state.MenuAccordion.map((item: any, i: any) => (
          <ListItem.Accordion
            noIcon
            key={i}
            style={styles.subcontainer}
            containerStyle={{backgroundColor: '#808080'}}
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.menuTitle}>
                    {item.Tipo}
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={item.expand}
            onPress={() => {
              this.handleChange(item.Id, item.expand);
            }}>
            {item.menuhijo.map((subitem: any, i: any) => (
              <ListItem
                key={i}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                style={styles.menusubcontainer}
                onPress={() => console.log('holi')}>
                <ListItem.Content>
                  <ListItem.Title style={styles.submenuTitle}>
                    {subitem}
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
