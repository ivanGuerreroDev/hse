import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {CheckBox, Input, Text} from 'react-native-elements';
import {
  CompositeNavigationProp,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {
  MainFrameStackParamList,
  RootMainStackParamList,
} from 'utils/types/navigations';

import Layaut from './layaut';
import { capitalize } from 'utils';

type StateProps = {
  capacitacion: any;
};

type Navigation = {
  navigation: CompositeNavigationProp<
    NavigationProp<MainFrameStackParamList, 'SubMenu'>,
    NavigationProp<RootMainStackParamList>
  >;
  route: RouteProp<RootMainStackParamList, 'List'>;
};

type Props = StateProps & Navigation;

class List extends Component<Props> {
  state = {
    Capacitacion: Object.keys(
      this.props.route.params.participantes[0].reduce((a: any, e: any) => {
        let groupByKeyName = e['IdCapacitacion'];
        (a[groupByKeyName]
          ? a[groupByKeyName]
          : (a[groupByKeyName] = null || [])
        ).push(e);
        return a;
      }, {}),
    ).map(
      (abuelo, i) =>
        abuelo && {
          Participantes: this.props.route.params.participantes[0]
            .filter((x: any) => x.IdCapacitacion.toString() === abuelo)
            .map(
              (x: any) =>
                x && {
                  Id: x.IdPersona,
                  NombreCompleto: x.NombreCompleto,
                  Estado: x.EstadoParticipante == 1 ? 0 : 1,
                },
            ),
        },
    ),
  };



  handleChange(id: string, selected: boolean) {


/* console.log(id);

    let arr = this.state.Capacitacion.map((x: any) => x.Participantes)

    let newArr = arr.map((item: any) => {
      console.log('id', item.map((subitem: any) => subitem.Id), id)

      if(item.find((subitem: any) => id === subitem.Id)){

        return {...item,
          Participantes: item.map((x: any) =>  x.Id == id ? {...x, Estado: !selected}: {...x} )
        };
      }else {
        return item;
      }

    });
    console.log('old', this.state.Capacitacion);
    console.log('new', newArr);
    console.log('updateado',this.state.Capacitacion) */


    // this.setState({Capacitacion: newArr.map((x: any) => x.Participantes)});
  }



  render() {
    return (
      <Layaut
        Titulo={'Seleccione Participantes'}
        Name={'List'}
        Color={'#116CB5'}
        Footer={false}
        navigation={() => this.props.navigation.goBack()}>
        <View style={styles.flatArea}>
          <View style={{height: 450, flex: 1}}>
            {
              <FlatList
                style={{}}
                numColumns={1}
                // keyExtractor={item => item}
                data={this.state.Capacitacion.map((x: any) => x)}
                renderItem={({item}) => {
                  console.log('ajam',item)
                  return (


                    item.Participantes.map((x: any) =>
                    <CheckBox
                      checkedColor="#116CB5"
                      size={20}
                      title={capitalize(x.NombreCompleto, 3)}
                      checked={x.Estado}
                      onPress={() => this.handleChange(x.Id, x.Estado )}
                    />
                    )
                  );
                }}
              />
            }
          </View>
          <View style={styles.goContainer}>
            <TouchableOpacity
              style={{...styles.goButton, backgroundColor: '#00000033'}}
              onPress={() =>
                /* this.props.navigation.navigate('List') */ console.log(
                  'asdasd',
                )
              }>
              <Text style={styles.goText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layaut>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  flatArea: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    color: '#00000099',
    opacity: 1,
    fontFamily: 'Roboto-Regular',
  },
  inputStyle: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  inputError: {
    height: 0,
  },
  goContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  goButton: {
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
  },
  goText: {
    letterSpacing: 1.5,
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: 13,
    color: '#fff',
  },
});
