import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Divider, Header, Image, Input, Text} from 'react-native-elements';
//Cognito
import {signOut} from 'views/Auth/cognito/cognito-wrapper';
//Redux
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {IUser} from 'state/user/types';
//Navigate
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'components/Types/navigations';

type Props = {
  currentUser: IUser | undefined;
  navigation: StackNavigationProp<MainFrameStackParamList>;
};

class ChangePass extends Component<Props> {
  state = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={
            <Image
              source={require('components/Assets/logo_hse_blanco.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          }
          statusBarProps={{barStyle: 'light-content'}}
        />
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.title}>Cambia tu contraseña</Text>
          </View>
          <View style={styles.containerInput}>
            <Input
              autoCapitalize="none"
              label={'Escribe tu contraseña actual'}
              value={this.state.Password}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />
            <Divider color="transparent" width={40} />
            <Input
              autoCapitalize="none"
              label={'Escribe tu nueva contraseña'}
              value={this.state.NewPassword}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />
            <Input
              autoCapitalize="none"
              label={'Confirma tu nueva contraseña'}
              value={this.state.ConfirmNewPassword}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputStyle}
              errorStyle={styles.inputError}
            />
          </View>
          <View style={styles.containerButtons}>
            <View style={{...styles.buttons, backgroundColor: '#F2F2F266'}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{...styles.buttonText, color: '#FDAE01'}}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.buttons,
                marginLeft: 30,
                backgroundColor: '#FDAE01',
              }}>
              <TouchableOpacity>
                <Text style={{...styles.buttonText, color: '#FFFFFF'}}>
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.currentUser.user,
  };
};

export default connect(mapStateToProps)(ChangePass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
    marginBottom: 96,
  },
  containerInput: {
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#FDAE01',
    height: 80,
    opacity: 1,
  },
  headerLogo: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: 0,
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
