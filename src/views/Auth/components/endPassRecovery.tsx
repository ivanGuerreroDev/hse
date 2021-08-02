import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'utils/navigations';

import Layout from 'views/Auth/components/layauts';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'EndPassRecovery'>;
};

class EndPassRecovery extends Component<Props> {
  render() {
    return (
      <Layout>
        <View style={styles.container}>
          <Divider color="transparent" width={20} />
          <Text style={styles.title}>{'Restablece tu contraseña'}</Text>
          <Text style={styles.message}>
            {
              'Has cambiado tu contraseña con éxito, ahora puedes volver a ingresar'
            }
          </Text>

          <Divider color="transparent" width={20} />

          <View style={styles.goContainer}>
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={styles.goText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
          <Divider color="transparent" width={40} />
          <Divider color="transparent" width={120} />
        </View>
      </Layout>
    );
  }
}

export default EndPassRecovery;

export const styles = StyleSheet.create({
  container: {
    marginLeft: 40,
    marginRight: 40,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
  goContainer: {
    padding: 6,
    paddingTop: 20,
    paddingBottom: 90,
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
});
