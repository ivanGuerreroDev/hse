import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Grid, Row} from 'react-native-easy-grid';
import {Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height} = Dimensions.get('window');
const box_count = 4;
const box_height = height / box_count;

class Layaut extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView
          /* style={styles.container} */
          edges={['bottom', 'right', 'left']}>
          {/*    <Grid>
            <Row style={styles.container}> */}
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
          {/*             </Row>
          </Grid>
          <Grid>
            <Row size={50}> */}
          <View style={styles.content}>{this.props.children}</View>
          {/*             </Row>
          </Grid>
          <Grid>
            <Row style={styles.footer}> */}
          <View style={styles.footer}>
            <Text style={styles.footer}>Por</Text>
            <Image
              source={require('components/Assets/Zimexa.png')}
              style={styles.footerLogo}
              resizeMode="stretch"
            />
          </View>
          {/*     </Row>
          </Grid> */}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Layaut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*     height: box_height, */
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  headerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 220,
    height: 100,
  },

  content: {
    flexDirection: 'column',
    /*    backgroundColor: 'orange', */
  },
  footer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerLogo: {
    width: 200,
    height: 60,
  },
});
