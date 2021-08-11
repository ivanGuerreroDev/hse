import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Divider, Input, Text} from 'react-native-elements';
//Cognito
import {respondNewPassword} from 'utils/cognito/cognito-wrapper';
//Navigation
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'utils/types/navigations';

import Layout from 'views/Auth/layaut';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
  route: RouteProp<AuthStackParamList, 'ForceChangePass'>;
};

class forceChangePass extends Component<Props> {
  state = {
    message1: '',
    message2: '',
    messageStyle: styles.messageNormal,

    verifyCode: '',
    newPass: '',
    confirmNewPass: '',
    showpassword: true,
    securePass: true,

    Errornewpassword: '',
    ErrconfirmNewPass: '',
  };

  validationData() {
    this.setState({
      Errornewpassword: '',
      ErrconfirmNewPass: '',
    });
    let isvalid = true;

    if (!this.state.newPass) {
      this.setState({Errornewpassword: 'La nueva contraseña es requrida'});
      isvalid = false;
    }
    if (this.state.newPass) {
      if (this.state.newPass.length < 6) {
        this.setState({
          Errornewpassword: 'La contraseña debe tener al menos 6 caracteres',
        });
        isvalid = false;
      }
    }
    if (!this.state.confirmNewPass) {
      this.setState({
        Errorpassword: 'La confirmación de contraseña es requerida',
      });

      isvalid = false;
    }
    if (this.state.confirmNewPass) {
      if (this.state.newPass !== this.state.confirmNewPass) {
        this.setState({
          ErrconfirmNewPass: 'Las contraseñas deben ser iguales',
        });
        isvalid = false;
      }
    }
    return isvalid;
  }

  onSubmit() {
    if (!this.validationData()) {
      return;
    }
    respondNewPassword(
      this.props.route.params.session,
      this.props.route.params.rutempresa,
      this.props.route.params.username,
      this.state.newPass,
    )
      .then(() => {
        this.props.navigation.navigate('SignIn');
      })
      .catch(err => {
        // console.warn(err);
        switch (err.name) {
          case 'InvalidParameterException':
            this.setState({
              message1: 'Ingrese datos válidos',
              message2: 'Por favor, vuelva a Intentarlo.',
              messageStyle: styles.messageRed,
            });
            break;

          case 'CodeMismatchException':
            this.setState({
              message1: 'Error en código de verificación.',
              message2: 'Por favor, vuelva a Intentarlo.',
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
    let inputPasswordRef: TextInput | null;

    let securePassIcon = (
      <View>
        <TouchableOpacity
          style={styles.buttonText}
          onPress={() => {
            this.setState({showpassword: !this.state.showpassword});
          }}>
          <Text style={styles.buttonText}>
            {this.state.showpassword ? 'Mostrar' : 'Ocultar'}
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Layout>
        <View style={styles.container}>
          <Divider color="transparent" width={20} />
          <Text style={styles.title}>{'Cambia tu contraseña'}</Text>
          <Text style={styles.text}>
            {
              'Como es la primera vez que estás ingresando a Zimexa, es necesario que cambies tu contraseña. '
            }
          </Text>

          <Divider color="transparent" width={30} />

          <Input
            ref={ref => (inputPasswordRef = ref)}
            autoCapitalize="none"
            secureTextEntry={this.state.showpassword}
            placeholder={'Contraseña'}
            errorMessage={this.state.Errornewpassword}
            onChangeText={newPass => this.setState({newPass})}
            value={this.state.newPass}
            rightIcon={securePassIcon}
            label={this.state.newPass ? 'Contraseña' : ''}
            rightIconContainerStyle={{width: 60}}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Input
            ref={ref => (inputPasswordRef = ref)}
            autoCapitalize="none"
            secureTextEntry={this.state.showpassword}
            placeholder="Confirmar Contraseña"
            errorMessage={this.state.ErrconfirmNewPass}
            onChangeText={confirmNewPass => this.setState({confirmNewPass})}
            value={this.state.confirmNewPass}
            rightIcon={securePassIcon}
            label={this.state.confirmNewPass ? 'Comfirmar Contraseña' : ''}
            rightIconContainerStyle={{width: 60}}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Divider color="transparent" width={30} />
          <View style={styles.goContainer}>
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.onSubmit()}>
              <Text style={styles.goText}>Cambiar contraseña</Text>
            </TouchableOpacity>
          </View>
          <Divider color="transparent" width={20} />
        </View>
      </Layout>
    );
  }
}

export default forceChangePass;

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
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17,
    marginRight: 20,
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
