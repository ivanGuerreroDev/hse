import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Layout from 'components/Layauts/MainFrame';

import ToucheableMenu from 'components/Forms/ToucheableMenu';

const path = 'components/Assets/Menu/';
const cargarImagen = require('components/Assets/Menu/');
const images = [
  {
    codigo: 'Observaciones',
    on: path + 'observaciones.png',
    off: path + 'observaciones_blanco.png',
  },
  {
    codigo: 'Inspecciones',
    on: path + 'inspecciones.png',
    off: path + 'inspecciones_blanco.png',
  },
  {
    codigo: 'Capacitaciones',
    on: path + 'capacitaciones.png',
    off: path + 'capacitaciones_blanco.png',
  },
  // {
  //   "codigo": "campanas",
  //   "on": require(path + 'campanas.png'),
  //   "off": require(path + 'campanas_off.png')
  // },
  // {
  //   "codigo": "hojasruta",
  //   "on": require(path + 'hojasruta.png'),
  //   "off": require(path + 'hojasruta_off.png')
  // },
  // {
  //   "codigo": "epp",
  //   "on": require(path + 'epp.png'),
  //   "off": require(path + 'epp_off.png')
  // },
  // ,
  // {
  //   "codigo": "conversaciones",
  //   "on": require(path + 'conversaciones.png'),
  //   "off": require(path + 'conversaciones_off.png')
  // },
  // ,
  // {
  //   "codigo": "alcohotest",
  //   "on": require(path + 'alcohotest.png'),
  //   "off": require(path + 'alcohotest_off.png')
  // },
  // ,
  // {
  //   "codigo": "velocidad",
  //   "on": require(path + 'velocidad.png'),
  //   "off": require(path + 'velocidad_off.png')
  // },
  // ,
  // {
  //   "codigo": "peligros",
  //   "on": require(path + 'peligros.png'),
  //   "off": require(path + 'peligros_off.png')
  // }
];

// let path = 'components/Assets/Menu/';
// let images = [
//   {
//     codigo: 'Observaciones',
//     on: 'observaciones.png',
//     off: 'observaciones_blanco.png',
//   },
//   {
//     codigo: 'Inspecciones',
//     on: 'inspecciones.png',
//     off: 'inspecciones_blanco.png',
//   },
//   {
//     codigo: 'Capacitaciones',
//     on: 'capacitaciones.png',
//     off: 'capacitaciones_blanco.png',
//   },
// ];

const data = [
  {
    id: '1',
    Nombre: 'Observaciones',
    estado: false,
    image: path + 'observaciones.png',
  },
  {
    id: '2',
    Nombre: 'Inspecciones',
    estado: false,
    image: path + 'observaciones.png',
  },
  {
    id: '3',
    Nombre: 'Capacitaciones',
    estado: false,
    image: path + 'observaciones.png',
  },
  {id: '4', Nombre: 'EPP', estado: false, image: path + 'observaciones.png'},
  {
    id: '5',
    Nombre: 'Alcohotest',
    estado: false,
    image: path + 'observaciones.png',
  },
  {
    id: '6',
    Nombre: 'Alcohotest',
    estado: false,
    image: path + 'observaciones.png',
  },
  {
    id: '7',
    Nombre: 'Alcohotest',
    estado: false,
    image: path + 'observaciones.png',
  },
];

class Home extends Component {
  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            numColumns={2}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item}) => {
              let backgroundColor = '#FFFFFF';
              let color = '#808080';
              let opacity = 1;
              let img;

              if (!item.estado) {
                backgroundColor = '#FFFFFF';
                color = '#111111';
                opacity = 0.3;
                img = 'capacitaciones.png';
              } else {
                img = require('components/Assets/Menu/capacitaciones.png');
              }
              return (
                /*  <ToucheableMenu img={img} /> */
                <TouchableOpacity
                  style={{
                    ...styles.card,
                    backgroundColor,
                  }}>
                  <View style={styles.cardHeader}></View>

                  {/* <Image
                    style={styles.cardImage}
                    source={require('components/Assets/Menu/')}}
                    resizeMode={'contain'}
                  /> */}

                  <View style={styles.cardFooter}>
                    <View style={styles.aling}>
                      <Text style={{...styles.text, color}}>{item.Nombre}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Layout>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 1,
    marginBottom: 96,
  },
  list: {
    alignSelf: 'center',
  },
  card: {
    flexBasis: '42%',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    width: 260,
    height: 160,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  cardFooter: {
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  text: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontFamily: 'PTSans-Bold',
  },
  aling: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
