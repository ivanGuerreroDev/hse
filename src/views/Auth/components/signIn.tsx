import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {Divider, Input, CheckBox, Text} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  GetUserCommandOutput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import {connect} from 'react-redux';
import {SaveUser, IUser} from 'state/user/types';
import {saveUser} from 'state/user/actions';
import {validate, format, clean} from 'rut.js';

import {getUser, signIn} from '../cognito/cognito-wrapper';
import Layaut from 'views/Auth/components/layauts';
import {AuthStackParamList} from 'utils/navigations';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList>;
  saveUser: SaveUser;
};

class SignIn extends Component<Props> {
  state = {
    messageStyle: styles.messageHidden,

    rutempresa: '',
    username: '',
    password: '',
    showpassword: true,
    remember: false,

    // Validation
    Errorutempresa: '',
    Errorusername: '',
    Errorpassword: '',
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
    if (!this.state.password) {
      this.setState({Errorpassword: 'La contraseña es requerida'});
      isvalid = false;
    }
    return isvalid;
  }

  onSubmit() {
    if (!this.validationData()) {
      return;
    }
    Keyboard.dismiss();
    new Promise(async (resolve: (value: IUser) => void, reject) => {
      try {
        let signin: InitiateAuthCommandOutput = await signIn(
          clean(this.state.rutempresa.slice(0, -1)),
          this.state.username,
          this.state.password,
        );
        if (signin.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
          this.props.navigation.navigate('ForceChangePass', {
            rutempresa: clean(this.state.rutempresa.slice(0, -1)),
            username: this.state.username,
            session: signin.Session,
          });
          this.setState({password: ''});
        }
        /*   if (signin.ChallengeName) {
          resolve();
        } */
        if (signin.AuthenticationResult?.AccessToken) {
          let accessToken: string = signin.AuthenticationResult.AccessToken;
          let userData: GetUserCommandOutput = await getUser(accessToken);
          if (userData.Username) {
            let user: IUser = {
              Empresa: clean(this.state.rutempresa.slice(0, -1)),
              Username: userData.Username,
              UserTokens: signin.AuthenticationResult,
            };
            resolve(user);
          }
        }
      } catch (err) {
        reject(err);
      }
    })
      .then(result => {
        this.props.saveUser(result, this.state.remember);
      })
      .catch(err => {
        switch (err.name) {
          case 'NotAuthorizedException':
            this.setState({
              messageStyle: styles.messageVisible,
            });
            break;
          case 'InvalidParameterException':
            this.setState({
              messageStyle: styles.messageVisible,
            });
            break;
          case 'UserNotFoundException':
            this.setState({
              messageStyle: styles.messageVisible,
            });
            break;
          default:
            this.setState({
              messageStyle: styles.messageVisible,
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
      <Layaut>
        <View style={styles.container}>
          <Divider color="transparent" width={40} />

          <Input
            autoCapitalize="none"
            placeholder="RUT Empresa (12345678-9)"
            errorMessage={this.state.Errorutempresa}
            onSubmitEditing={() => inputPasswordRef?.focus()}
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
            placeholder="Usuario"
            errorMessage={this.state.Errorusername}
            onSubmitEditing={() => inputPasswordRef?.focus()}
            onChangeText={username => this.setState({username})}
            label={this.state.username ? 'Usuario' : ''}
            value={this.state.username}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Input
            ref={ref => (inputPasswordRef = ref)}
            autoCapitalize="none"
            secureTextEntry={this.state.showpassword}
            placeholder="Contraseña"
            errorMessage={this.state.Errorpassword}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            rightIcon={securePassIcon}
            label={this.state.password ? 'Contraseña' : ''}
            rightIconContainerStyle={{width: 60}}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
        </View>
        <View style={styles.rememberContainer}>
          <CheckBox
            checked={this.state.remember}
            onPress={() => this.setState({remember: !this.state.remember})}
            title="Recuérdame"
            containerStyle={styles.checkbox}
            checkedColor="#FDAE01"
            textStyle={{fontWeight: 'normal', fontSize: 12}}
            size={20}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('forgotPassword');
            }}>
            <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <Text style={this.state.messageStyle}>Credenciales Incorrectas.</Text>

        <View style={styles.goContainer}>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => this.onSubmit()}>
            <Text style={styles.goText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
      </Layaut>
    );
  }
}

const mapDispatchToProps = {
  saveUser,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
    /*     paddingTop: 0, */
  },
  messageHidden: {
    textAlign: 'center',
    color: 'transparent',
  },
  messageVisible: {
    textAlign: 'center',
    fontSize: 13,
    color: 'red',
  },
  rememberContainer: {
    marginLeft: 20,
    marginRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkbox: {
    paddingLeft: 0,
    width: '40%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 12,
    marginRight: 1,
  },
  goContainer: {
    marginLeft: 35,
    marginRight: 35,
    padding: 6,
    /*  paddingBottom: 50, */
  },
  buttonText: {
    justifyContent: 'center',
    color: '#FDAE01',
    fontSize: 12,
  },
  goButton: {
    backgroundColor: '#FDAE01',
    borderRadius: 4,
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
