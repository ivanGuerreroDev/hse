import React, { Component, LegacyRef } from 'react';
import {
    Animated,
    GestureResponderEvent,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle
} from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';

type CaptureButtonProps = {
    animateRecord?: boolean;
    onLongPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    onPressOut?: ((event: GestureResponderEvent) => void) | null | undefined;
    size: number;
};

export class CaptureButton extends Component<CaptureButtonProps> {
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
        this.setState({ isRecording: true });
        this.props.onLongPress?.(event);
    }

    private _onPressIn = (event: GestureResponderEvent) => {
        this.captureAnimated.start();
    };

    private _onPressOut = (event: GestureResponderEvent) => {
        this.captureAnimated.reset();
        this.setState({ isRecording: false });
        this.state.captureAnimation.margin.setValue(2);
        this.props.onPressOut?.(event);
    };

    constructor(props: CaptureButtonProps) {
        super(props);

        this.animatedViewBaseStyle = {
            backgroundColor: 'white',
            borderRadius: this.props.size,
            flex: 1
        };

        this.pressableStyle = {
            borderColor: 'white',
            borderRadius: this.props.size,
            borderWidth: 2,
            height: this.props.size,
            width: this.props.size
        };
    }

    render() {
        return (
            <Pressable
                style={this.pressableStyle}
                onLongPress={(event) => this._onLongPress(event)}
                onPressIn={(event) => this._onPressIn(event)}
                onPressOut={(event) => this._onPressOut(event)}
            >
                <Animated.View
                    style={[
                        this.animatedViewBaseStyle,
                        this.state.isRecording && this.props.animateRecord
                            ? this.state.recordAnimation
                            : this.state.captureAnimation
                    ]}
                />
            </Pressable>
        );
    }
}

type RecordTimerProps = {
    ref?: LegacyRef<RecordTimer>;
};

export class RecordTimer extends Component<RecordTimerProps> {
    state = {
        duration: 0,
        sizeAnimation: {
            padding: new Animated.Value(0),
            maxWidth: new Animated.Value(0),
            maxHeight: new Animated.Value(0)
        }
    };

    private animate = Animated.parallel([
        Animated.timing(this.state.sizeAnimation.padding, {
            toValue: 6,
            duration: 0,
            useNativeDriver: false
        }),
        Animated.timing(this.state.sizeAnimation.maxWidth, {
            toValue: 80,
            duration: 200,
            useNativeDriver: false
        }),
        Animated.timing(this.state.sizeAnimation.maxHeight, {
            toValue: 30,
            duration: 200,
            delay: 100,
            useNativeDriver: false
        })
    ]);

    private inanimate = Animated.parallel([
        Animated.timing(this.state.sizeAnimation.padding, {
            toValue: 0,
            duration: 1,
            delay: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.sizeAnimation.maxWidth, {
            toValue: 0,
            duration: 200,
            delay: 100,
            useNativeDriver: false
        }),
        Animated.timing(this.state.sizeAnimation.maxHeight, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        })
    ]);

    private recordInterval: NodeJS.Timeout | undefined;

    constructor(props: RecordTimerProps) {
        super(props);
    }

    startAnimation() {
        this.animate.start(() => this.animate.stop());

        this.recordInterval = setInterval(() => {
            this.setState({ duration: this.state.duration + 1 });
        }, 1000);
    }

    stopAnimation() {
        this.inanimate.start(() => this.inanimate.stop());

        if (this.recordInterval) clearInterval(this.recordInterval);
        this.setState({ duration: 0 });
    }

    render() {
        return (
            <Animated.View style={[styles.timer, this.state.sizeAnimation]}>
                <Text style={{ fontSize: 14, color: 'white' }}>
                    {new Date(
                        0,
                        0,
                        0,
                        0,
                        0,
                        this.state.duration
                    ).toLocaleTimeString()}
                </Text>
            </Animated.View>
        );
    }
}

type GalleryButtonProps = {
    ref?: LegacyRef<GalleryButton>;
    startCount?: number;
};

export class GalleryButton extends Component<GalleryButtonProps> {
    state = {
        count: 0,
        animatedBadge: {
            width: new Animated.Value(0),
            height: new Animated.Value(0),
            borderRadius: new Animated.Value(0),
            bottom: new Animated.Value(2),
            right: new Animated.Value(2)
        }
    };

    private animate = Animated.parallel([
        Animated.timing(this.state.animatedBadge.width, {
            toValue: 24,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.height, {
            toValue: 24,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.borderRadius, {
            toValue: 12,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.bottom, {
            toValue: -10,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.right, {
            toValue: -10,
            duration: 300,
            useNativeDriver: false
        })
    ]);

    private inanimate = Animated.parallel([
        Animated.timing(this.state.animatedBadge.width, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.height, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.borderRadius, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.bottom, {
            toValue: 2,
            duration: 300,
            useNativeDriver: false
        }),
        Animated.timing(this.state.animatedBadge.right, {
            toValue: 2,
            duration: 300,
            useNativeDriver: false
        })
    ]);

    constructor(props: GalleryButtonProps) {
        super(props);

        this.state.count = props.startCount || 0;
        if (this.state.count > 0) {
            this.state.animatedBadge.width = new Animated.Value(24);
            this.state.animatedBadge.height = new Animated.Value(24);
            this.state.animatedBadge.borderRadius = new Animated.Value(12);
            this.state.animatedBadge.bottom = new Animated.Value(-10);
            this.state.animatedBadge.right = new Animated.Value(-10);
        }
    }

    render() {
        return (
            <Animated.View>
                <Icon
                    type="material"
                    name="collections"
                    size={32}
                    color="white"
                />
                <Animated.View
                    style={[styles.selectionBadge, this.state.animatedBadge]}
                >
                    <Text style={styles.selectionCounter}>
                        {this.state.count}
                    </Text>
                </Animated.View>
            </Animated.View>
        );
    }

    addCount() {
        if (this.state.count === 0)
            this.animate.start(() => this.animate.stop());
        this.setState({ count: this.state.count + 1 });
    }

    removeCount() {
        if (this.state.count === 1)
            this.inanimate.start(() => this.inanimate.stop());
        this.setState({ count: this.state.count - 1 });
    }
}

type CaptureAnimationProps = {
    ref?: LegacyRef<CaptureAnimationProps>;
};

const styles = StyleSheet.create({
    timer: {
        backgroundColor: 'red',
        height: 30,
        width: 80,
        padding: 6,
        borderRadius: 14,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectionCounter: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectionBadge: {
        position: 'absolute',
        backgroundColor: '#FDAE01',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
