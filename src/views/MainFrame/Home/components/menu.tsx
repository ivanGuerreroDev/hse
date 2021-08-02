import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'utils/navigations';
import Layout from 'views/MainFrame/components/layauts';
import Menus from 'components/Assets/Menu/MenuBd';

type Props = {
  navigation: StackNavigationProp<MainFrameStackParamList>;
};
class Menu extends Component<Props> {
  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            numColumns={2}
            keyExtractor={item => item.id}
            data={Menus}
            renderItem={({item}) => {
              let tintColor;
              let opacity = 1;
              let navigate = '';
              if (!item.estado) {
                tintColor = '#808080';
                opacity = 0.7;
              } else {
                navigate = item.nombre;
              }
              return (
                <TouchableOpacity
                  style={{...styles.card, opacity}}
                  /* onPress={() => {
                    item.estado &&
                      item.navigate === 'Menu' &&
                      this.props.navigation.navigate(item.nombre);
                  }} */
                >
                  <View style={styles.cardHeader}></View>

                  <Image
                    style={{...styles.cardImage, tintColor}}
                    source={item.image}
                    resizeMode={'contain'}
                  />

                  <View style={styles.cardFooter}>
                    <View style={styles.aling}>
                      <Text style={{...styles.text}}>{item.nombre}</Text>
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

export default Menu;

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
    backgroundColor: '#FFFFFF',
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
    fontWeight: 'bold',
    color: '#808080',
  },
  aling: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
