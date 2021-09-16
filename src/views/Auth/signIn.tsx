import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  ScrollView,
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
// Formulario
import {saveFormulariosAsync} from 'state/formulariodinamico/thunk';
import {SaveFormularioAsync} from 'state/formulariodinamico/types';
// Perfill
import {savePerfilesAsync} from 'state/perfil/thunk';
import {SavePerfilAsync} from 'state/perfil/types';
import {IPerfil} from 'utils/types/perfil';
// Menu
import {saveMenusAsyncThunk} from 'state/menu/thunk';
import {SaveMenuAsync} from 'state/menu/types';
// Capacitacion
import {saveCapacitacionAsyncThunk} from 'state/capacitacion/thunk';
import {SaveCapacitacionAsync} from 'state/capacitacion/types';
// Observaciones
import {saveObservacionAsyncThunk} from 'state/observacion/thunk';
import {SaveObservacionAsync} from 'state/observacion/types';
// Inspecciones
import {saveInspeccionAsyncThunk} from 'state/inspeccion/thunk';
import {SaveInspeccionAsync} from 'state/inspeccion/types';
import {validate, clean} from 'rut.js';

import {getUser, signIn} from '../../utils/cognito/cognito-wrapper';
import Layaut from 'views/Auth/layaut';
import {AuthStackParamList} from 'utils/types/navigations';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'state/store/store';

type StateProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

type DispatchProps = {
  saveUser: SaveUser;
  saveFormulariosAsync: SaveFormularioAsync;
  savePerfilesAsync: SavePerfilAsync;
  saveMenusAsyncThunk: SaveMenuAsync;
  saveCapacitacionAsyncThunk: SaveCapacitacionAsync;
  saveObservacionAsyncThunk: SaveObservacionAsync;
  saveInspeccionAsyncThunk: SaveInspeccionAsync;
};

type Props = StateProps & DispatchProps;
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
    let regex = /^\d{7,8}-[\dk]{1}$/;
    if (!this.state.rutempresa.match(regex)) {
      this.setState({Errorutempresa: 'El formato es incorrecto'});
      isvalid = false;
    }

    if (!validate(this.state.rutempresa)) {
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
    Keyboard.dismiss();
    if (!this.validationData()) {
      return;
    }
    new Promise(async (resolve: (value: IUser) => void, reject) => {
      try {
        let signin: InitiateAuthCommandOutput = await signIn(
          this.state.rutempresa.slice(0, -2),
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
        /*  if (signin.ChallengeName) {
          resolve();
        } */
        if (signin.AuthenticationResult?.AccessToken) {
          let accessToken: string = signin.AuthenticationResult.AccessToken;
          let userData: GetUserCommandOutput = await getUser(accessToken);
          if (userData.Username) {
            let user: IUser = {
              Empresa: this.state.rutempresa.slice(0, -2),
              Username: userData.Username,
              UserTokens: signin.AuthenticationResult,
            };

            this.props.saveFormulariosAsync();
            this.props.savePerfilesAsync(user);
            this.props.saveMenusAsyncThunk(user);
            this.props.saveCapacitacionAsyncThunk(user);
            this.props.saveObservacionAsyncThunk(user);
            this.props.saveInspeccionAsyncThunk(user);

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
        // console.log(err);

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
        <Divider color="transparent" width={30} />
        <ScrollView>
          <View style={styles.containerInput}>
            <Input
              autoCapitalize="none"
              placeholder="RUT Empresa (12345678-9)"
              errorMessage={this.state.Errorutempresa}
              onSubmitEditing={() => inputPasswordRef?.focus()}
              onChangeText={rutempresa =>
                this.setState({rutempresa, Errorutempresa: ''})
              }
              label={this.state.rutempresa ? 'RUT Empresa (12345678-9)' : ''}
              value={this.state.rutempresa}
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
              onChangeText={username =>
                this.setState({username, Errorusername: ''})
              }
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
              onChangeText={password =>
                this.setState({password, Errorpassword: ''})
              }
              value={this.state.password}
              rightIcon={securePassIcon}
              label={this.state.password ? 'Contraseña' : ''}
              rightIconContainerStyle={{width: 60}}
              labelStyle={styles.inputLabel}
              inputContainerStyle={styles.inputContainer}
              errorStyle={styles.inputError}
              inputStyle={styles.inputStyle}
            />
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
          </View>
        </ScrollView>
        <Text style={this.state.messageStyle}>Credenciales Incorrectas.</Text>
        <Divider color="transparent" width={20} />
        <View style={styles.goContainer}>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => this.onSubmit()}>
            <Text style={styles.goText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
        <Divider color="transparent" width={40} />
      </Layaut>
    );
  }
}

/* const mapDispatchToProps = {
  saveUser,
};

export default connect(null, mapDispatchToProps)(SignIn); */

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
): DispatchProps => {
  return {
    saveUser: (user: IUser, remember: boolean) =>
      dispatch(saveUser(user, remember)),
    saveFormulariosAsync: () => dispatch(saveFormulariosAsync()),
    savePerfilesAsync: (user: IUser) => dispatch(savePerfilesAsync(user)),
    saveMenusAsyncThunk: (user: IUser) => dispatch(saveMenusAsyncThunk(user)),
    saveCapacitacionAsyncThunk: (user: IUser) =>
      dispatch(saveCapacitacionAsyncThunk(user)),
    saveObservacionAsyncThunk: (user: IUser) =>
      dispatch(saveObservacionAsyncThunk(user)),
    saveInspeccionAsyncThunk: (user: IUser) =>
      dispatch(saveInspeccionAsyncThunk(user)),
  };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  null,
  mapDispatchToProps,
)(SignIn);

const styles = StyleSheet.create({
  containerInput: {
    flex: 4,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  checkbox: {
    paddingLeft: 0,
    paddingRight: 0,
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
    flex: 1,
    marginLeft: 35,
    marginRight: 35,
    padding: 6,
    justifyContent: 'center',
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
