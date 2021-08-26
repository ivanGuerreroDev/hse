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
import {MainFrameStackParamList} from 'utils/types/navigations';

import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {MenuData} from 'utils/types/menu';

import Layout from 'views/MainFrame/layaut';
import Menus from 'components/Assets/Menu/MenuBd';
import Config from 'react-native-config';

type Props = {
  navigation: StackNavigationProp<MainFrameStackParamList>;
  menu: MenuData[] | any[];
};
class Menu extends Component<Props> {
  state = {
    menu: this.props.menu[0],
  };

  render() {
    console.log(this.props.menu[0]);

    return (
      <Layout>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            numColumns={2}
            keyExtractor={item => item.IdModulo}
            data={this.state.menu}
            renderItem={({item}) => {
              console.log(`${Config.s3}${item.NombreMenu}`);

              let tintColor;
              let opacity = 1;
              let navigate = '';
              if (!item.Estado) {
                tintColor = '#808080';
                opacity = 0.7;
              } else {
                /* navigate = item.navigate; */
              }
              return (
                <TouchableOpacity
                  style={{...styles.card, opacity}}
                  /*  onPress={() => {
                    item.estado &&
                      this.props.navigation.navigate('SubMenu', {
                        titulo: item.nombre,
                        submenulist: item.menuLista,
                        submenuaccordion: item.menuAcordeon,
                        submenuCard: item.menuCard,
                      });
                  }} */
                >
                  <View style={styles.cardHeader}></View>
                  <Image
                    style={{...styles.cardImage, tintColor}}
                    source={{uri: `${Config.s3}${item.NombreMenu}.png`}}
                    resizeMode={'contain'}
                  />

                  <View style={styles.cardFooter}>
                    <View style={styles.aling}>
                      <Text style={{...styles.text}}>{item.NombreMenu}</Text>
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

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menus.menus,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 1,
    /*     marginBottom: 96, */
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
