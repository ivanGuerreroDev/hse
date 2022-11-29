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
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'utils/types/navigations';

type Props = {
  currentUser: IUser | undefined;
  forgiveUser: ForgiveUser;
  saveUser: SaveUser;
  navigation: StackNavigationProp<MainFrameStackParamList>;
};

class ChangePass extends Component<Props> {
  state = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: '',

    showpassword: true,
    shownewpassword: true,

    ErrorPassword: '',
    ErrorNewPassword: '',
    ErrorConfirmNewPassword: '',
  };

  constructor(props: Props) {
    super(props);

    if (props.currentUser && props.currentUser.UserTokens.RefreshToken) {
      refreshToken(
        props.currentUser.UserTokens.RefreshToken,
        props.currentUser.Empresa,
      )
        .then(result => {
          if (props.currentUser) {
            let user: IUser = {
              ...props.currentUser,
              UserTokens: {
                ...props.currentUser.UserTokens,
                AccessToken: result.AuthenticationResult?.AccessToken,
                IdToken: result.AuthenticationResult?.IdToken,
              },
            };
            props.saveUser(user, true);
          } else {
            props.forgiveUser();
          }
        })
        .catch(err => {
          console.error(err)
          props.forgiveUser();
        });
    }
  }

  validationData() {
    this.setState({
      ErrorPassword: '',
      ErrorNewPassword: '',
      ErrorConfirmNewPassword: '',
    });
    let isvalid = true;
    if (!this.state.Password) {
      this.setState({ErrorPassword: 'La contraseña actual es requrida'});
      isvalid = false;
    }
    if (!this.state.NewPassword) {
      this.setState({ErrorNewPassword: 'La nueva contraseña es requrida'});
      isvalid = false;
    }
    if (this.state.NewPassword) {
      if (this.state.NewPassword.length < 6) {
        this.setState({
          ErrorNewPassword: 'La contraseña debe tener al menos 6 caracteres',
        });
        isvalid = false;
      }
    }
    if (!this.state.ConfirmNewPassword) {
      this.setState({
        ErrorConfirmNewPassword: 'La confirmación de contraseña es requerida',
      });

      isvalid = false;
    }
    if (this.state.ConfirmNewPassword) {
      if (this.state.NewPassword !== this.state.ConfirmNewPassword) {
        this.setState({
          ErrorConfirmNewPassword: 'Las contraseñas deben ser iguales',
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
    Keyboard.dismiss();

    changePassword(
      this.props.currentUser?.UserTokens.AccessToken,
      this.state.Password,
      this.state.NewPassword,
    )
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.error(err);

        switch (err.name) {
          case 'NotAuthorizedException':
            this.setState({
              ErrorPassword: 'Credenciales Incorrectas',
            });
            break;
          case 'LimitExceededException':
            this.setState({
              ErrorPassword: 'Has excedido el numero de intentos',
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
          style={styles.buttonInput}
          onPress={() => {
            this.setState({showpassword: !this.state.showpassword});
          }}>
          <Text style={styles.buttonInput}>
            {this.state.showpassword ? 'Mostrar' : 'Ocultar'}
          </Text>
        </TouchableOpacity>
      </View>
    );

    let secureNewPassIcon = (
      <View>
        <TouchableOpacity
          style={styles.buttonInput}
          onPress={() => {
            this.setState({shownewpassword: !this.state.shownewpassword});
          }}>
          <Text style={styles.buttonInput}>
            {this.state.shownewpassword ? 'Mostrar' : 'Ocultar'}
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={styles.headergoBack}
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" type="fontisto" color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={require('components/Assets/logo_hse_blanco.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
          }
          statusBarProps={{barStyle: 'light-content'}}
        />

        <View style={styles.subContainer}>
          <ScrollView>
            <View>
              <Text style={styles.title}>Cambia tu contraseña</Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                autoCapitalize="none"
                label={
                  this.state.Password ? 'Escribe tu contraseña actual' : ''
                }
                placeholder={'Escribe tu contraseña actual'}
                value={this.state.Password}
                onChangeText={Password =>
                  this.setState({Password, ErrorPassword: ''})
                }
                errorMessage={this.state.ErrorPassword}
                ref={ref => (inputPasswordRef = ref)}
                secureTextEntry={this.state.showpassword}
                rightIcon={securePassIcon}
                rightIconContainerStyle={{width: 60}}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Divider color="transparent" width={30} />
              <Input
                autoCapitalize="none"
                label={
                  this.state.NewPassword ? 'Escribe tu nueva contraseña' : ''
                }
                placeholder={'Confirma tu nueva contraseña'}
                value={this.state.NewPassword}
                onChangeText={NewPassword =>
                  this.setState({NewPassword, ErrorNewPassword: ''})
                }
                errorMessage={this.state.ErrorNewPassword}
                ref={ref => (inputPasswordRef = ref)}
                secureTextEntry={this.state.shownewpassword}
                rightIcon={secureNewPassIcon}
                rightIconContainerStyle={{width: 60}}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                autoCapitalize="none"
                label={
                  this.state.ConfirmNewPassword
                    ? 'Confirma tu nueva contraseña'
                    : ''
                }
                placeholder={'Confirma tu nueva contraseña'}
                value={this.state.ConfirmNewPassword}
                onChangeText={ConfirmNewPassword =>
                  this.setState({
                    ConfirmNewPassword,
                    ErrorConfirmNewPassword: '',
                  })
                }
                errorMessage={this.state.ErrorConfirmNewPassword}
                ref={ref => (inputPasswordRef = ref)}
                secureTextEntry={this.state.shownewpassword}
                rightIcon={secureNewPassIcon}
                rightIconContainerStyle={{width: 60}}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
            </View>
            <View style={styles.containerButtons}>
              <View style={{...styles.buttons, backgroundColor: '#F2F2F266'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
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
                  <Text
                    style={{...styles.buttonText, color: '#FFFFFF'}}
                    onPress={() => this.onSubmit()}>
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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

const mapDispatchToProps = {
  forgiveUser,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
