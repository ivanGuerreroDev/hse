import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    EmitterSubscription,
    Keyboard,
    KeyboardEvent,
    KeyboardEventListener,
    LogBox,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootMainStackParamList } from 'types/navigations';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

type Props = {
    route: RouteProp<RootMainStackParamList, 'Modal'>;
};

export default class Modal extends Component<Props> {
    keyboardWillShow: EmitterSubscription | undefined;
    keyboardWillHide: EmitterSubscription | undefined;
    state = {
        keyboardHeight: new Animated.Value(0)
    };

    constructor(props: Props) {
        super(props);

        if (Platform.OS === 'ios') {
            this.keyboardWillShow = Keyboard.addListener(
                'keyboardWillShow',
                this.handleKeyboardWillShow
            );
            this.keyboardWillHide = Keyboard.addListener(
                'keyboardWillHide',
                this.handleKeyboardWillHide
            );
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            this.keyboardWillShow?.remove();
            this.keyboardWillHide?.remove();
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.props.route.params}
                <Animated.View style={{ height: this.state.keyboardHeight }} />
            </SafeAreaView>
        );
    }

    handleKeyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
        const { height } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;

        Animated.timing(this.state.keyboardHeight, {
            toValue: keyboardHeight,
            duration: 250,
            useNativeDriver: false
        }).start();
    };

    handleKeyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
        Animated.timing(this.state.keyboardHeight, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false
        }).start();
    };
}
