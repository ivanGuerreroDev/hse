import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';

import Layout from 'components/Auth/Layaut';

class ForgotPassword extends Component {
  state = {
    message1: 'Introduce tu direccion de correo electrónico',
    message2: 'recibirás el código de verificación.',
    messageStyle: styles.messageNormal,

    username: '',
  };

  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <Text style={this.state.messageStyle}>{this.state.message1}</Text>
          <Text style={this.state.messageStyle}>{this.state.message2}</Text>

          <Divider color="transparent" width={20} />

          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Nombre de usuario o correo"
            onChangeText={username => this.setState({username})}
            value={this.state.username}
          />

          <View style={styles.goContainer}>
            <TouchableOpacity style={styles.goButton}>
              <Icon name="arrow-forward" type="material" color="white" />
            </TouchableOpacity>
          </View>

          <Divider color="transparent" width={20} />

          <Button title="Volver a inicio de Sesión" type="clear" />
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
  messageNormal: {
    textAlign: 'center',
    color: 'black',
  },
  messageRed: {
    textAlign: 'center',
    color: 'red',
  },
  goContainer: {
    alignItems: 'center',
  },
  goButton: {
    backgroundColor: '#FDAE01',
    borderRadius: 8,
    justifyContent: 'center',
    height: 40,
  },
  goText: {
    alignSelf: 'center',
    fontSize: 20,
    marginRight: 20,
  },
});
