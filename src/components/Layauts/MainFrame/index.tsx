import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, Image, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

class Layout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={
            <Image
              source={require('../../Assets/logo_hse_blanco.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          }
          statusBarProps={{barStyle: 'light-content'}}
        />
        <View style={styles.children}>{this.props.children}</View>
      </View>
    );
  }
}

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FDAE01',
    height: 80,
    opacity: 1,
  },
  headerLogo: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  headerTitle: {
    color: 'white',
  },
  children: {
    backgroundColor: '#F2F2F266',
  },
});
