import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';

const {height, width} = Dimensions.get('window');

class Layaut extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {height < 684 ? (
          <ScrollView>
            <Header
              containerStyle={{...styles.headerContainer, paddingTop: '5%'}}
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
        ) : (
          <>
            <Header
              containerStyle={{...styles.headerContainer, paddingTop: '5%'}}
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
          </>
        )}
      </SafeAreaView>
    );
  }
}

export default Layaut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flex: 2,
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
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footer: {
    alignItems: 'center',
  },
  footerLogo: {
    width: 200,
    height: 60,
  },
});
