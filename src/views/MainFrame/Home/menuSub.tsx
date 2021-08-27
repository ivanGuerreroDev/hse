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

import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {ICapacitacion, IObservaciones, IInspecciones} from 'utils/types/menu';

type Props = {
  route: RouteProp<MainFrameStackParamList, 'SubMenu'>;
  navigation: StackNavigationProp<MainFrameStackParamList>;

  submenuList: IObservaciones[] | any[];
  submenuCard: ICapacitacion[] | any[];
  submenuAccordion: IInspecciones | any[];
};
class SubMenu extends Component<Props> {
  state = {
    list: this.props.submenuList,
    accordion: this.props.submenuAccordion,
    card: this.props.submenuCard[0],
  };
  render() {
    console.log('Card', this.state.card);
    console.log('List', this.state.list);
    console.log('Accordion', this.state.accordion);

    return (
      <Layaut
        Titulo={this.props.route.params.titulo}
        navigation={() => this.props.navigation.goBack()}>
        <ScrollView>
          <View style={styles.container}>
            {this.props.route.params.titulo === 'Observaciones' && (
              <View>
                <MenuList List={this.state.list} />
              </View>
            )}
            {/* {this.props.route.params.titulo === 'Inspecciones' && (
              <View>
                <MenuAccordion Accordion={this.state.accordion} />
              </View>
            )} */}
            {this.props.route.params.titulo === 'Capacitaciones' && (
              <View>
                <MenuCard Card={this.state.card} />
              </View>
            )}
          </View>
        </ScrollView>
      </Layaut>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    submenuList: state.observacion.observaciones,
    submenuCard: state.capacitacion.capacitaciones,
    submenuAccordion: state.inspeccion.inspecciones,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);

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
