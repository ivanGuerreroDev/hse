import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
//Navigate
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'utils/types/navigations';

import Layaut from './layaut';
import MenuList from './menuList';
import MenuAccordion from './menuAccordion';
import MenuCard from './menuCard';

type Props = {
  route: RouteProp<MainFrameStackParamList, 'SubMenu'>;
  navigation: StackNavigationProp<MainFrameStackParamList>;
};

class SubMenu extends Component<Props> {
  render() {
    return (
      <Layaut
        Titulo={this.props.route.params.titulo}
        navigation={() => this.props.navigation.goBack()}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <MenuList List={this.props.route.params.submenulist} />
            </View>
            <View>
              <MenuAccordion
                Accordion={this.props.route.params.submenuaccordion}
              />
            </View>
            <View>
              <MenuCard
                /* tipo={item.tipo}
                  titulo={item.titulo}
                  cargo={item.cargo}
                  navigate={item.navigate} */
                Card={this.props.route.params.submenuCard}
              />
            </View>
          </View>
        </ScrollView>
      </Layaut>
    );
  }
}

export default SubMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 96,
  },
  subContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    marginBottom: 96,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headergoBack: {
    marginRight: '50%',
  },
  containerInput: {
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#FDAE01',
    height: 80,
    opacity: 1,
  },
  buttonInput: {justifyContent: 'flex-end', color: '#FDAE01', fontSize: 12},
  headerLogo: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '63%',
    width: 70,
    height: 70,
  },
  headerTitle: {
    color: 'white',
  },
  title: {
    opacity: 1,
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
    paddingTop: 0,
    marginTop: 0,
  },
  containerButtons: {
    paddingTop: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttons: {
    width: 120,
    height: 45,
    alignSelf: 'center',
    borderRadius: 4,
  },
  buttonText: {
    paddingTop: 10,
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: 16,
  },
});
