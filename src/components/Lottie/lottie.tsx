import React, {Component} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

class Lottie extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          flex: 1,
          padding: 20,
          marginTop: 280,
        }}>
        <LottieView
          style={{width: 200, height: 120}}
          source={require('lottie')}
          autoPlay
          loop={false}
        />
      </View>
    );
  }
}

export default Lottie;
