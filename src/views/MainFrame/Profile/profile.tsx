import React, {Component} from 'react';
//Components
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
//Redux
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {forgiveUser} from 'state/user/actions';
import {IUser, ForgiveUser} from 'state/user/types';
import {IPerfil} from 'utils/types/perfil';
//Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'utils/types/navigations';

import Layout from 'views/MainFrame/layaut';

type StateProps = {
  currentUser: IUser | undefined;
  perfil: IPerfil[];
  navigation: StackNavigationProp<MainFrameStackParamList>;
};

type DispatchProps = {
  forgiveUser: ForgiveUser;
};

type Props = StateProps & DispatchProps;
class Profile extends Component<Props> {
  render() {
    console.log('Profile', this.props.perfil);

    return (
      <Layout>
        <View style={{alignItems: 'flex-end', paddingEnd: 5}}>
          <Text style={styles.vtext}>V. 1.4.0</Text>
        </View>
        <View style={styles.avatar}>
          <Avatar
            size="large"
            source={require('components/Assets/Profile/icono_foto.png')}
          />
          <Text style={styles.userText}>
            {`${
              this.props.perfil[this.props.perfil.length - 1]?.NombrePersona
            } ${
              this.props.perfil[this.props.perfil.length - 1]?.ApellidoPaterno
            } ${
              this.props.perfil[this.props.perfil.length - 1].ApellidoMaterno
            }`}
          </Text>
          <Text>
            {
              this.props.perfil[this.props.perfil.length - 1]
                ?.CorreoElectronicoPersona
            }
          </Text>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Información Personal</Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                disabled
                autoCapitalize="none"
                label={'Nombre'}
                value={`${
                  this.props.perfil[this.props.perfil.length - 1]?.NombrePersona
                } ${
                  this.props.perfil[this.props.perfil.length - 1]
                    ?.ApellidoPaterno
                } ${
                  this.props.perfil[this.props.perfil.length - 1]
                    .ApellidoMaterno
                }`}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={'RUT'}
                value={`${
                  this.props.perfil[this.props.perfil.length - 1]?.RunPersona
                }-${
                  this.props.perfil[this.props.perfil.length - 1]?.DvPersona
                }`}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <View>
                <Text style={styles.title}>Información Laboral</Text>
              </View>
              <Input
                disabled
                autoCapitalize="none"
                label={'EESS'}
                value={
                  this.props.perfil[this.props.perfil.length - 1]?.NombreEmpresa
                }
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={this.props.perfil[this.props.perfil.length - 1]?.Mascara}
                value={
                  this.props.perfil[this.props.perfil.length - 1]?.NombreNV3
                }
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={'Cargo'}
                value={
                  this.props.perfil[this.props.perfil.length - 1]?.NombreCargo
                }
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <View>
                <Text style={styles.title}>Inicio de sesión</Text>
              </View>
              <Input
                disabled
                autoCapitalize="none"
                label={'Correo Electronico'}
                value={
                  this.props.perfil[this.props.perfil.length - 1]
                    ?.CorreoElectronicoPersona
                }
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('changePass')}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.buttons, marginTop: 10}}>
              <TouchableOpacity onPress={() => this.props.forgiveUser()}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.currentUser.user,
    perfil: state.perfiles.perfiles,
  };
};

const mapDispatchToProps = {
  forgiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 250,
  },
  containerInput: {},
  vtext: {
    fontSize: 10,
    alignContent: 'flex-end',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#00000099',
  },
  avatar: {
    paddingBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F2F2F266',
  },
  userText: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
  buttons: {
    /*     marginLeft: 35,
    marginRight: 35,
    padding: 6,*/
    height: 50,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    marginTop: 10,
    /*     letterSpacing: 1.25, */
    fontWeight: '700',
    /* alignSelf: 'center', */
    fontSize: 16,
  },
});
