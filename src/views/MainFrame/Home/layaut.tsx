import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Divider, Header, Image, Input, Text, Icon} from 'react-native-elements';
//Cognito
import {changePassword, refreshToken} from 'utils/cognito/cognito-wrapper';
//Redux
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {forgiveUser, saveUser} from 'state/user/actions';
import {ForgiveUser, IUser, SaveUser} from 'state/user/types';
//Navigate
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'utils/types/navigations';
//Data
import Menu from 'components/Assets/Menu/MenuBd';
type Props = {
  Titulo: String;
  navigation: () => void;
  /*   route: RouteProp<MainFrameStackParamList, 'SubMenu'>;
  navigation: StackNavigationProp<MainFrameStackParamList>; */
};

class Layaut extends Component<Props> {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftComponent={
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={styles.headergoBack}
                onPress={this.props.navigation}>
                <Icon name="arrow-left" type="fontisto" color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.titulo}>{this.props.Titulo}</Text>
            </View>
          }
          statusBarProps={{barStyle: 'light-content'}}
        />

        <View style={styles.content}>{this.props.children}</View>
      </View>
    );
  }
}

export default Layaut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FDAE01',
    height: 80,
    opacity: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    width: '400%',
  },
  headergoBack: {
    marginLeft: '5%',
    marginRight: '10%',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  content: {
    flex: 1,
    backgroundColor: '#F2F2F266',
  },
});
