import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';

const {height} = Dimensions.get('window');

class Layaut extends Component {
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{...styles.container, maxHeight: height}}>
        <Header
          containerStyle={{...styles.headerContainer /* paddingTop: '15%' */}}
          centerComponent={
            <Image
              source={require('components/Assets/logo_hse.png')}
              style={styles.headerLogo}
              resizeMode="stretch"
            />
          }
        />
        <View style={styles.content}>{this.props.children}</View>

        <View style={styles.footer}>
          <Text style={styles.text}>Por</Text>
          <Image
            source={require('components/Assets/Zimexa.png')}
            style={styles.footerLogo}
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    );
  }
}

export default Layaut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flex: 2,
    height: height * 0.2,
    opacity: 1,
    backgroundColor: '#ffffff',
  },
  headerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 220,
    height: 100,
  },
  content: {
    flex: 6,
    height: height * 0.7,
    justifyContent: 'center',
    /*    flexDirection: 'column', */
  },
  text: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footer: {
    height: height * 0.1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  footerLogo: {
    width: 200,
    height: 60,
  },
});
