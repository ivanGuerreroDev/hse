import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {DocumentoFactory} from 'utils/formulariodinamico/DocumentoFactory';
import {IFormulario} from 'utils/types/formulariodinamico';
import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  MainFrameStackParamList,
  RootMainStackParamList,
} from 'utils/types/navigations';

type Props = {
  List: any;
  formularios: IFormulario[];
  navigation: CompositeNavigationProp<
    NavigationProp<MainFrameStackParamList, 'SubMenu'>,
    NavigationProp<RootMainStackParamList>
  >;
};

class MenuList extends Component<Props> {
  state = {
    List: Object.values(this.props.List).map(
      (abuelo: any, i) =>
        abuelo && {
          Observacion: abuelo.map(
            (item: any) =>
              item && {
                Encabezado: item,
                Formulario: this.props.formularios.filter(
                  x => x._id === item.Formulario,
                ),
              },
          ),
        },
    ),
  };
  render() {
    console.log('ab', this.state.List);

    return (
      <View style={styles.container}>
        {this.state.List[0].Observacion.map((item: any, i: any) => (
          <ListItem
            key={i}
            Component={TouchableScale}
            /* friction={90}
            tension={100}
            activeScale={0.95} */
            style={styles.contentMenu}
            onPress={() => {
              if (item.Formulario[0]) {
                console.log('formuilario', item.Formulario[0]);
                this.props.navigation.navigate('FormularioDinamico', {
                  documento: DocumentoFactory.createFromFormulario(
                    item.Formulario[0],
                  ),
                });
              }
            }}>
            <ListItem.Content>
              <ListItem.Title style={styles.menuTitle}>
                {item.Encabezado.titulo}
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
