import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Divider, Input, Text} from 'react-native-elements';
import {validate, format, clean} from 'rut.js';
import {StackNavigationProp} from '@react-navigation/stack';

import {AuthStackParamList} from 'utils/navigations';
import {resetPassword} from '../cognito/cognito-wrapper';
import Layout from 'views/Auth/components/layauts';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'forgotPassword'>;
};

class ForgotPassword extends Component<Props> {
  state = {
    message1: 'Restablece tu contraseña',
    message2:
      'Introduce el rut de la empresa y tu direccion de correo electrónico',
    message3: 'recibirás el código de verificación.',
    messageStyle: styles.messageNormal,

    username: '',
    rutempresa: '',
    Errorusername: '',
    Errorutempresa: '',
  };

  validationData() {
    this.setState({
      Errorutempresa: '',
      Errorusername: '',
      Errorpassword: '',
    });
    let isvalid = true;

    if (!validate(clean(this.state.rutempresa))) {
      this.setState({Errorutempresa: 'El rut ingresado no es valido'});
      isvalid = false;
    }
    if (!this.state.rutempresa) {
      this.setState({Errorutempresa: 'El rut es requerido'});
      isvalid = false;
    }
    if (!this.state.username) {
      this.setState({Errorusername: 'El usuario es requerido'});
      isvalid = false;
    }
    return isvalid;
  }

  onSubmit() {
    if (!this.validationData()) {
      return;
    }
    resetPassword(
      this.state.username,
      clean(this.state.rutempresa.slice(0, -1)),
    )
      .then(result => {
        if (result) {
          if (result.CodeDeliveryDetails?.Destination) {
            this.props.navigation.navigate('ConfirmPassRecovery', {
              rutempresa: clean(this.state.rutempresa.slice(0, -1)),
              username: this.state.username,
              destination: result.CodeDeliveryDetails.Destination,
            });
          } else {
            this.setState({
              message1: '¡Hubo un error!',
              message2: 'Por favor, vuelva a Intentarlo.',
              messageStyle: styles.messageRed,
            });
          }
        }
      })
      .catch(err => {
        console.warn(err);
        switch (err.name) {
          case 'NotAuthorizedException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageRed,
            });
            break;
          case 'InvalidParameterException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageRed,
            });
            break;
          case 'UserNotFoundException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageRed,
            });
            break;

          default:
            this.setState({
              message1: '¡Hubo un error!',
              message2: 'Por favor, vuelva a Intentarlo.',
              messageStyle: styles.messageRed,
            });
            break;
        }
      });
  }
  render() {
    return (
      <Layout>
        <View style={styles.container}>
          {<Divider color="transparent" width={20} />}
          <Text style={styles.title}>{'Restablece tu contraseña'}</Text>
          <Text style={styles.text}>
            {`Introduce el rut de la empresa y tu direccion de correo  
              donde recibirás el código de verificación`}
          </Text>
          {<Divider color="transparent" width={30} />}

          <Input
            autoCapitalize="none"
            placeholder="RUT Empresa (12345678-9)"
            errorMessage={this.state.Errorutempresa}
            onChangeText={rutempresa =>
              this.setState({rutempresa, Errorutempresa: ''})
            }
            label={this.state.rutempresa ? 'RUT Empresa (12345678-9)' : ''}
            value={this.state.rutempresa ? format(this.state.rutempresa) : ''}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />

          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Correo electrónico"
            errorMessage={this.state.Errorusername}
            onChangeText={username => this.setState({username})}
            label={this.state.username ? 'Correo electrónico' : ''}
            value={this.state.username}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <View style={styles.goSignIn}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}>
              <Text style={styles.buttonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.goContainer}>
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.onSubmit()}>
              <Text style={styles.goText}>RESTABLECE TU CONTRASEÑA</Text>
            </TouchableOpacity>
          </View>

          <Divider color="transparent" width={20} />

          {/*  <Button title="Volver a inicio de Sesión" type="clear" /> */}
        </View>
      </Layout>
    );
  }
}

export default ForgotPassword;

export const styles = StyleSheet.create({
  container: {
    marginLeft: 40,
    marginRight: 40,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: 'black',
  },
  messageNormal: {
    textAlign: 'center',
    color: 'black',
  },
  messageRed: {
    textAlign: 'center',
    color: 'red',
  },
  goSignIn: {
    marginLeft: 20,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    justifyContent: 'flex-end',
    color: '#FDAE01',
    fontSize: 12,
  },
  goContainer: {
    padding: 6,
    paddingTop: 20,
    paddingBottom: 70,
  },
  goButton: {
    backgroundColor: '#FDAE01',
    borderRadius: 8,
    justifyContent: 'center',
    height: 40,
  },
  goText: {
    letterSpacing: 1.25,
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },
  inputLabel: {
    paddingLeft: 5,
    fontSize: 10,
    color: '#00000099',
    opacity: 1,
    fontFamily: 'Roboto-Regular',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#0000001F',
    borderRadius: 4,
    opacity: 1,
  },
  inputError: {
    paddingTop: 0,
    marginTop: 0,
  },
  inputStyle: {
    paddingLeft: 15,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
});
