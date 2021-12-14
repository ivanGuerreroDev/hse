import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {CompositeNavigationProp, NavigationProp, RouteProp} from '@react-navigation/native';
import {MainFrameStackParamList, RootMainStackParamList} from 'utils/types/navigations';

import Layaut from './layaut';

type StateProps = {
  capacitacion: any;
};

type Navigation = {
  navigation: CompositeNavigationProp<
    NavigationProp<MainFrameStackParamList, 'SubMenu'>,
    NavigationProp<RootMainStackParamList>
  >;
  route: RouteProp<RootMainStackParamList, 'Capacitaciones'>;
};

type Props = StateProps & Navigation;

class Capacitaciones extends Component<Props> {
  state = {
    Material: '',
    Lugar: '',
    Descripcion: '',
    selectedItems: [],
  };

  render() {
    console.log('chacha', this.props.route.params.selected.map((x: any) => x.Selected));

    return (
      <Layaut
        Titulo={this.props.route.params.selected.map((x: any) => x.Tipo)}
        Name={'Capacitacion'}
        Color={'#FDAE01'}
        Footer={true}
        navigation={() => this.props.navigation.goBack()}>
        <View>
          <View style={styles.titulo}>
            <Text style={styles.textTitulo}>
              {this.props.route.params.selected.map((x: any) => x.Titulo)}
            </Text>
          </View>
          <View style={{...styles.textdescription, paddingTop: 20}}>
            <Text style={styles.TextAzul}>{'Descripción'}</Text>
          </View>
          <View style={{...styles.textdescription, paddingTop: 5}}>
            <Text style={styles.text}>
              {this.props.route.params.selected.map((x: any) => x.Descripcion)}
            </Text>
          </View>
          <View style={styles.inputArea}>
            <Input
              autoCapitalize="none"
              placeholder="Material de Apoyo"
              value={this.state.Material}
              onChangeText={value => this.setState({Material: value})}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />
            <Input
              autoCapitalize="none"
              placeholder="Lugar (*)"
              value={this.state.Lugar}
              onChangeText={value => this.setState({Lugar: value})}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />
            <Input
              autoCapitalize="none"
              placeholder="Descripción (*)"
              value={this.state.Descripcion}
              onChangeText={value => this.setState({Descripcion: value})}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />

            <View style={styles.goContainer}>
              <TouchableOpacity
                style={{...styles.goButton, backgroundColor: '#116CB5'}}
                onPress={() => this.props.navigation.navigate('List', {
                    participantes: this.props.route.params.selected.map((x: any) => x.Selected)})
                  }
              >
                <Text style={styles.goText}>SELECCIONAR PARTICIPANTES</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.goContainer}>
              <TouchableOpacity
                style={{...styles.goButton, backgroundColor: '#67B56A'}}
                onPress={() => this.props.navigation.navigate('Relator')}
              >
                <Text style={styles.goText}>RELATOR EXTERNO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Layaut>
    );
  }
}

export default Capacitaciones;

const styles = StyleSheet.create({
  titulo: {
    paddingTop: 20,
    alignItems: 'center',
  },
  textTitulo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#00000099',
    fontFamily: 'Roboto-Medium',
  },
  TextAzul: {
    color: '#116CB5',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  textdescription: {
    paddingHorizontal: 35,
    fontFamily: 'Roboto-Medium',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'justify',
    color: '#00000099',
    fontSize: 15,
  },
  inputArea: {
    paddingHorizontal: 25,
    paddingTop: 20,
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 25,
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
