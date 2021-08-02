import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Divider, Icon, Input, Text} from 'react-native-elements';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'utils/navigations';
import {confirmResetPassword} from 'views/Auth/cognito/cognito-wrapper';

import Layout from 'views/Auth/components/layauts';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'ConfirmPassRecovery'>;
  route: RouteProp<AuthStackParamList, 'ConfirmPassRecovery'>;
};

class ConfirmPassRecovery extends Component<Props> {
  state = {
    message1: 'El código fue enviado a:',
    message2: '',
    messageStyle: styles.messageNormal,

    verifyCode: '',
    newPass: '',
    confirmNewPass: '',
    showpassword: true,
    securePass: true,

    ErrverifyCode: '',
    ErrnewPass: '',
    Errpassword: '',
    ErrconfirmNewPass: '',
  };

  validationData() {
    this.setState({
      ErrverifyCode: '',
      ErrnewPass: '',
      Errpassword: '',
      ErrconfirmNewPass: '',
    });
    let isvalid = true;

    if (!this.state.verifyCode) {
      this.setState({ErrverifyCode: 'El código es requerido'});
      isvalid = false;
    }
    if (!this.state.newPass) {
      this.setState({Errpassword: 'La nueva contreaseña es requrida'});
      isvalid = false;
    }
    if (this.state.newPass.length < 6) {
      this.setState({
        Errpassword: 'La contreaseña debe tener al menos 6 caracteres',
      });
      isvalid = false;
    }
    if (!this.state.confirmNewPass) {
      this.setState({
        ErrconfirmNewPass: 'La confirmación de contraseña es requerida',
      });

      isvalid = false;
    }
    if (this.state.newPass !== this.state.confirmNewPass) {
      this.setState({
        ErrconfirmNewPass: 'Las contraseñas deben ser iguales',
      });
      isvalid = false;
    }
    return isvalid;
  }

  onSubmit() {
    if (!this.validationData()) {
      return;
    }
    confirmResetPassword(
      this.state.verifyCode,
      this.props.route.params.rutempresa,
      this.props.route.params.username,
      this.state.newPass,
    )
      .then(result => {
        console.log(result);

        this.props.navigation.navigate('EndPassRecovery');
      })
      .catch(err => {
        console.warn(err);
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

  componentDidMount() {
    let {destination} = this.props.route.params;
    this.setState({
      message2: destination,
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
          <Text style={styles.title}>{'Restablece tu contraseña'}</Text>
          <Text style={styles.text}>
            {'El código fue enviado al correo electrónico '}
          </Text>

          <Divider color="transparent" width={30} />

          <Input
            autoCapitalize="none"
            keyboardType="numeric"
            label={this.state.verifyCode ? 'Código de Verificación' : ''}
            placeholder={'Código de Verificación'}
            errorMessage={this.state.ErrverifyCode}
            onSubmitEditing={() => inputPasswordRef?.focus()}
            onChangeText={verifyCode => this.setState({verifyCode})}
            value={this.state.verifyCode}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Input
            ref={ref => (inputPasswordRef = ref)}
            autoCapitalize="none"
            secureTextEntry={this.state.showpassword}
            placeholder="Nueva Contraseña"
            errorMessage={this.state.Errpassword}
            onChangeText={newPass => this.setState({newPass})}
            value={this.state.newPass}
            rightIcon={securePassIcon}
            label={this.state.newPass ? 'Nueva Contraseña' : ''}
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
            label={this.state.confirmNewPass ? 'Confirmar Contraseña' : ''}
            rightIconContainerStyle={{width: 60}}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <View style={styles.goContainer}>
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.onSubmit()}>
              <Text style={styles.goText}>Cambiar contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

export default ConfirmPassRecovery;

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
