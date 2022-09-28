import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  ActivityIndicator,
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

const {height} = Dimensions.get('window');

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

    autenticate: false,
    percentage: 30,
    // Validation
    Errorutempresa: '',
    Errorusername: '',
    Errorpassword: '',

    placeholder_emp: '12345678-9',
    placeholder_user: 'Usuario',
    placeholder_pass: 'Contraseña',
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
    this.setState({autenticate: isvalid});
    return isvalid;
  }

  onSubmit() {
    Keyboard.dismiss();
    this.setState({autenticate: true});
    if (!this.validationData()) {
      return;
    }
    new Promise(async (resolve: (value: IUser) => void, reject) => {
      try {
        this.setState({percentage: this.state.percentage + 10});

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
        this.setState({percentage: 90});
        if (signin.AuthenticationResult?.AccessToken) {
          let accessToken: string = signin.AuthenticationResult.AccessToken;
          let userData: GetUserCommandOutput = await getUser(accessToken);
          if (userData.Username) {
            let user: IUser = {
              Empresa: this.state.rutempresa.slice(0, -2),
              Username: userData.Username,
              UserTokens: signin.AuthenticationResult,
            };
            this.props.saveFormulariosAsync(user);
            this.props.savePerfilesAsync(user);
            this.props.saveMenusAsyncThunk(user);
            this.props.saveCapacitacionAsyncThunk(user);
            this.props.saveObservacionAsyncThunk(user);
            this.props.saveInspeccionAsyncThunk(user);
            resolve(user);
          }
        }
        this.setState({percentage: 100});
      } catch (err) {
        reject(err);
      }
    })
      .then(result => {
        this.props.saveUser(result, this.state.remember);
      })
      .catch(err => {
        // console.log(err);
        this.setState({percentage: this.state.percentage + 10});
        this.setState({autenticate: false});
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
    let inputUserRef: TextInput | null;
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
        <Divider color="transparent" width={180} />
        <View style={styles.containerInput}>
          <Input
            autoCapitalize="none"
            errorMessage={this.state.Errorutempresa}
            onSubmitEditing={() => inputUserRef?.focus()}
            onChangeText={rutempresa =>
              this.setState({rutempresa, Errorutempresa: ''})
            }
            label={'RUT Empresa'}
            placeholder={this.state.placeholder_emp}
            onFocus={() => this.setState({placeholder_emp: ''})}
            onBlur={() => this.setState({placeholder_emp: '12345678-9'})}
            value={this.state.rutempresa}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Input
            ref={ref => (inputUserRef = ref)}
            autoCapitalize="none"
            keyboardType="email-address"
            errorMessage={this.state.Errorusername}
            onSubmitEditing={() => inputPasswordRef?.focus()}
            onChangeText={username =>
              this.setState({username, Errorusername: ''})
            }
            label={'Usuario'}
            placeholder={this.state.placeholder_user}
            onFocus={() => this.setState({placeholder_user: ''})}
            onBlur={() => this.setState({placeholder_user: 'Usuario'})}
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
            errorMessage={this.state.Errorpassword}
            onChangeText={password =>
              this.setState({password, Errorpassword: ''})
            }
            value={this.state.password}
            rightIcon={securePassIcon}
            label={'Contraseña'}
            placeholder={this.state.placeholder_pass}
            onFocus={() => this.setState({placeholder_pass: ''})}
            onBlur={() => this.setState({placeholder_pass: 'Contraseña'})}
            rightIconContainerStyle={{width: '20%'}}
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            errorStyle={styles.inputError}
            inputStyle={styles.inputStyle}
          />
          <Divider color="transparent" width={90} />
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
            style={{justifyContent: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('forgotPassword');
            }}>
            <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <Text style={this.state.messageStyle}>Credenciales Incorrectas.</Text>

        <Divider color="transparent" width={20} />

        <View style={styles.goContainer}>
          {!this.state.autenticate ? (
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.onSubmit()}>
              <Text style={styles.goText}>INGRESAR</Text>
            </TouchableOpacity>
          ) : (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#FDAE01" />
            </View>
          )}
        </View>

        <Divider color="transparent" width={40} />
      </Layaut>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
): DispatchProps => {
  return {
    saveUser: (user: IUser, remember: boolean) =>
      dispatch(saveUser(user, remember)),
    saveFormulariosAsync: (user: IUser) => dispatch(saveFormulariosAsync(user)),
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
    flex: 1,
    paddingHorizontal: '3%',
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
    flex: 2,
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingVertical: '5%',
    paddingTop: '8%',
    paddingRight: '4%',
  },
  checkbox: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '40%',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  text: {
    fontSize: 12,
    marginRight: 1,
  },
  goContainer: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
  },
  buttonText: {
    justifyContent: 'flex-start',
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
    fontSize: 12,
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
    marginTop: 1 /*  */,
    marginBottom: '2%',
  },
  inputStyle: {
    paddingLeft: '4%',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
});
