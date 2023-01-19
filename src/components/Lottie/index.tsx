import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    onAnimationFinish: () => void;
};
class Lottie extends Component<Props> {
    render() {
        return (
            <View style={styles.lottie}>
                <LottieView
                    style={{ marginHorizontal: 10 }}
                    source={require('../../../android/app/src/main/assets/lottie_hse.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={this.props.onAnimationFinish}
                />
            </View>
        );
    }
}

export default Lottie;

const styles = StyleSheet.create({
    lottie: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
