import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Header, Image, Icon} from 'react-native-elements';

class Layout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={styles.headergoBack}
                // onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="arrow-left" type="fontisto" color="transparent" />
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
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FDAE01',
    height: 80,
    opacity: 1,
  },
  headergoBack: {
    marginRight: '50%',
  },
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
  children: {
    flexDirection: 'column',
    backgroundColor: '#F2F2F266',
  },
});
