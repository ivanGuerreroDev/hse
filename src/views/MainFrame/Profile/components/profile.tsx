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
//Cognito
import {signOut} from 'views/Auth/cognito/cognito-wrapper';
//Redux
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {IUser} from 'state/user/types';
//Navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {MainFrameStackParamList} from 'components/Types/navigations';

import Layout from 'components/Layauts/MainFrame';

type Props = {
  currentUser: IUser | undefined;
  navigation: StackNavigationProp<MainFrameStackParamList>;
};
class Profile extends Component<Props> {
  state = {
    Rut: '18.799.725-9',
    Nombre: 'Williams Mesina Oyarce',
    Correo: 'wmesinaoyarce@gmail.com',
    Empresa: 'Innoapsion Ltda',
    CentroTrabajo: 'Gerencia de operaciones',
    Cargo: 'Diseñador',
  };
  render() {
    return (
      <Layout>
        <ScrollView>
          <View style={styles.avatar}>
            <Avatar
              size="large"
              source={require('components/Assets/Profile/icono_foto.png')}
            />
            <Text style={styles.userText}>{this.state.Nombre}</Text>
            <Text>{this.state.Correo}</Text>
          </View>

          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Información Personal</Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                disabled
                autoCapitalize="none"
                label={'Nombre'}
                value={this.state.Nombre}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={'RUT'}
                value={this.state.Rut}
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
                value={this.state.Empresa}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={'Centro de trabajo'}
                value={this.state.CentroTrabajo}
                labelStyle={styles.inputLabel}
                inputStyle={styles.inputStyle}
                errorStyle={styles.inputError}
              />
              <Input
                disabled
                autoCapitalize="none"
                label={'Cargo'}
                value={this.state.Cargo}
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
                value={this.state.Correo}
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
              <TouchableOpacity
                onPress={() =>
                  signOut(
                    this.props.currentUser?.Empresa,
                    this.props.currentUser?.Username,
                  )
                }>
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
  };
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 96,
  },
  containerInput: {},
  avatar: {
    paddingTop: 15,
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
