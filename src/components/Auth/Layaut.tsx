import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, ScrollView} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

class Layaut extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          edges={['bottom', 'right', 'left']}>
          <Header
            containerStyle={styles.headerContainer}
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
            <Text>Por</Text>
            <Image
              source={require('components/Assets/Zimexa.png')}
              style={styles.footerLogo}
              resizeMode="stretch"
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Layaut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    flex: 0,
    opacity: 1,
  },
  headerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    width: 220,
    height: 100,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    alignItems: 'center',
    flex: 0,
  },
  footerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200,
    height: 60,
  },
});
