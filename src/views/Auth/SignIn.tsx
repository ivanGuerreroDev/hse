import React, {Component} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Divider, Input, CheckBox, Text} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'components/Types/navigations';
import {
  GetUserCommandOutput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import {connect} from 'react-redux';
import {SaveUser, IUser} from 'state/user/types';
import {saveUser} from 'state/user/actions';
import {validate, format, clean} from 'rut.js';
// Utils
import {getUserPool} from 'utils';
// Wrapper
import {getUser, signIn} from './cognito/cognito-wrapper';
// Componentd
import Layaut from 'components/Auth/Layaut';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SignIn'>;
  saveUser: SaveUser;
};

class SignIn extends Component<Props> {
  state = {
    message: ' ',
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
    new Promise(async (resolve: (value: IUser) => void, reject) => {
      try {
        let userpool = await getUserPool(
          clean(this.state.rutempresa.slice(0, -1)),
        );
        console.log(userpool.errorType);

        if (!userpool.errorType) {
          let signin: InitiateAuthCommandOutput = await signIn(
            userpool.ClientId,
            this.state.username,
            this.state.password,
          );

          if (signin.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            console.log('cambio de clave por primer inicio');
          }
          if (signin.ChallengeName) {
            reject('Challenge required');
          }
          if (signin.AuthenticationResult?.AccessToken) {
            let accessToken: string = signin.AuthenticationResult.AccessToken;
            let userData: GetUserCommandOutput = await getUser(accessToken);
            if (userData.Username) {
              let user: IUser = {
                Username: userData.Username,
                UserTokens: signin.AuthenticationResult,
              };
              resolve(user);
            }
          }
          reject('unknown');
        } else {
          this.setState({
            message: 'Tus credenciales son incorrectas',
            messageStyle: styles.messageVisible,
          });
        }
      } catch (err) {
        reject(err);
      }
    })
      .then(result => {
        this.props.saveUser(result, this.state.remember);
      })
      .catch(err => {
        console.warn(JSON.stringify(err));
        console.log(err.name);
        switch (err.name) {
          case 'NotAuthorizedException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageVisible,
            });
            break;
          case 'InvalidParameterException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageVisible,
            });
            break;
          case 'UserNotFoundException':
            this.setState({
              message: 'Tus credenciales son incorrectas',
              messageStyle: styles.messageVisible,
            });
            break;
          default:
            this.setState({
              message: '¡Ha ocurrido un error!',
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
          {<Divider color="transparent" width={20} />}

          <Input
            autoCapitalize="none"
            placeholder="Rut Empresa (12345678-9)"
            errorMessage={this.state.Errorutempresa}
            onSubmitEditing={() => inputPasswordRef?.focus()}
            onChangeText={rutempresa => this.setState({rutempresa})}
            value={this.state.rutempresa ? format(this.state.rutempresa) : ''}
          />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Usuario"
            errorMessage={this.state.Errorusername}
            onSubmitEditing={() => inputPasswordRef?.focus()}
            onChangeText={username => this.setState({username})}
            value={this.state.username}
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
            rightIconContainerStyle={{alignContent: 'center'}}
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

        <Text style={this.state.messageStyle}>{this.state.message}</Text>
        <Text style={this.state.messageStyle}>Credenciales Incorrectas.</Text>

        <View style={styles.goContainer}>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => this.onSubmit()}>
            <Text style={styles.goText}>Ingresar</Text>
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
    paddingTop: 0,
  },
  messageHidden: {
    textAlign: 'center',
    color: 'transparent',
  },
  messageVisible: {
    textAlign: 'center',
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
    paddingBottom: 50,
  },
  buttonText: {
    justifyContent: 'center',
    color: '#FDAE01',
    fontSize: 12,
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
    fontSize: 20,
    marginRight: 20,
    color: '#fff',
  },
});
