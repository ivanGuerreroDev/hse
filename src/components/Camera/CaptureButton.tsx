import React, { Component } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle
} from 'react-native';

type Props = {
  animateRecord?: boolean;
  onLongPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressIn?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
  size: number;
};

export default class CaptureButton extends Component<Props> {
  state = {
    captureAnimation: {
      margin: new Animated.Value(2)
    },
    isRecording: false,
    recordAnimation: {
      backgroundColor: 'red',
      margin: 0
    }
  };

  private animatedViewBaseStyle: StyleProp<ViewStyle> = {};
  private pressableStyle: StyleProp<ViewStyle> = {};

  private captureAnimated = Animated.timing(
    this.state.captureAnimation.margin,
    {
      toValue: 6,
      duration: 500,
      useNativeDriver: false
    }
  );

  private _onLongPress(event: any) {
    this.setState({isRecording: true});
    this.props.onLongPress?.(event);
  }

  private _onPress = (event: GestureResponderEvent) => {
    this.props.onPress?.(event);
  };

  private _onPressIn = (event: GestureResponderEvent) => {
    this.captureAnimated.start();
    this.props.onPressIn?.(event);
  };

  private _onPressOut = (event: GestureResponderEvent) => {
    this.captureAnimated.reset();
    this.setState({isRecording: false});
    this.state.captureAnimation.margin.setValue(2);
    this.props.onPressOut?.(event);
  };

  constructor(props: Props) {
    super(props);

    this.animatedViewBaseStyle = {
      backgroundColor: 'white',
      borderRadius: this.props.size,
      flex: 1,
    };

    this.pressableStyle = {
      borderColor: 'white',
      borderRadius: this.props.size,
      borderWidth: 2,
      height: this.props.size,
      width: this.props.size,
    };
  }

  render() {
    return (
      <Pressable style={this.pressableStyle}
        onLongPress={(event) => this._onLongPress(event)}
        onPress={(event) => this._onPress(event)}
        onPressIn={(event) => this._onPressIn(event)}
        onPressOut={(event) => this._onPressOut(event)}
      >
        <Animated.View
          style={[
            this.animatedViewBaseStyle,
            (this.state.isRecording && this.props.animateRecord) ?
              this.state.recordAnimation : this.state.captureAnimation
          ]}/>
      </Pressable>
    );
  }
}
