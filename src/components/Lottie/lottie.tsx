import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

// import isLoading from 'src'

type Props = {
  isLoading: boolean;
};
class Lottie extends Component<Props> {
  render() {
    return (
      <View style={styles.lottie}>
        <LottieView
          style={{width: 200, height: 120}}
          source={require('../../../android/app/src/main/assets/lottie_hse.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => this.setState({isLoading: false})}
        />
      </View>
    );
  }
}

export default Lottie;

const styles = StyleSheet.create({
  lottie: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    padding: 20,
    marginTop: 240,
  },
});
