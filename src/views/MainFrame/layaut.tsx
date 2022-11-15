import {FadeInImage} from 'components/FadeImage/FadeInImage';
import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {Header, Image, Icon} from 'react-native-elements';

class Layout extends Component {
  state = {
    logo: require('components/Assets/logo_hse_blanco.png'),
  };
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

              <FadeInImage uri={this.state.logo} image={styles.headerLogo} />
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
    height: 110,
    opacity: 1,
    borderBottomWidth: 0,
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F2F2F266',
  },
});
