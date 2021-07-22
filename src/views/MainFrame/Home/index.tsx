import React, {Component} from 'react';
import {
  View,
} from 'react-native';
class Home extends Component {
  render() {
    return (
                  <View style={styles.cardFooter}>
                  </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  cardFooter: {
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
});
