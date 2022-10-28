import React, { Component, LegacyRef } from 'react';
import { Linking, Pressable, StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-elements';
import { CaptureButton, GalleryButton, RecordTimer } from './CameraAnimations';
import { RNCamera } from 'react-native-camera';
import { PermissionStatus, RESULTS } from 'react-native-permissions';
import {
  checkCameraPermission,
  checkMicrophonePermission
} from 'utils/permissions';
type Props = {
  canRecord?: boolean;
  onCaptureMedia?: (mediaUri: string) => void;
  onGalleryPress?: () => void;

  ref?: LegacyRef<Camera>;
  selectedItemsCount?: number;
};

type State = {
  cameraPermission: PermissionStatus;
  microphonePermission: PermissionStatus;
  isRecording: boolean;
  fadeAnimation: Animated.Value;
  lastCaptured: any;
};

export default class Camera extends Component<Props, State> {
  recordTimerRef: RecordTimer | null = null;
  galleryButtonRef: GalleryButton | null = null;
  rnCameraRef: RNCamera | null = null;

  state: State = {
    cameraPermission: RESULTS.UNAVAILABLE,
    microphonePermission: RESULTS.UNAVAILABLE,
    isRecording: false,
    fadeAnimation: new Animated.Value(0),
    lastCaptured: null
  }

  private _onStartRecording() {
    if (this.props.canRecord) {
      this.recordTimerRef?.startAnimation();

      this.setState({isRecording: true});
      this.rnCameraRef?.recordAsync()
        .then(response => { console.debug(`Video Captured: ${response.uri}`)
          this.props.onCaptureMedia?.(response.uri);
        });
    }
  }

  private _onCapture() {
    this.recordTimerRef?.stopAnimation();

    if (this.state.isRecording) {
      this.setState({isRecording: false});
      this.rnCameraRef?.stopRecording();
    }
    else {
      this.rnCameraRef?.takePictureAsync()
        .then(async response => { console.debug(`Photo captured: ${response.uri}`);
          this.props.onCaptureMedia?.(response.uri);
          this.setState({
            lastCaptured: response.base64
          })
          this.fadeOut();
        });
    }
  }

  fadeOut = () => {
    Animated.sequence(
      [
        Animated.timing(this.state.fadeAnimation, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: false
        }),
        Animated.timing(this.state.fadeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false
        })
      ]
    ).start();
  };

  constructor(props: Props) { console.debug('Construct Camera');
    super(props);

    checkCameraPermission()
      .then(resultCamera => {
        if (resultCamera === RESULTS.GRANTED || resultCamera === RESULTS.LIMITED)
          checkMicrophonePermission()
            .then(resultMicrophone => {
              this.setState({
                cameraPermission: resultCamera,
                microphonePermission: resultMicrophone
              });
            });
        else
            this.setState({cameraPermission: resultCamera});
      });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.cameraPermission != this.state.cameraPermission;
  }

  render() { console.debug('Render Camera');
    switch (this.state.cameraPermission) {
      case RESULTS.UNAVAILABLE:
        return (
          <View style={styles.noCameraLayout}>
            <Text style={{textAlign: 'center'}}>
              <Text>Cámara no disponible</Text>
              {'\n'}
              <Text style={styles.noCameraLink}
                onPress={() => this.props.onGalleryPress?.()}>
                Presione aquí para acceder a la galería
              </Text>
            </Text>
          </View>
        );

      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return (
          <View style={styles.noCameraLayout}>
            <Text style={{textAlign: 'center'}}>
              <Text>No tiene permisos para acceder a la cámara</Text>
              {'\n'}
              <Text style={styles.noCameraLink}
                onPress={() => Linking.openSettings()}>
                Presione aquí para ir a configuraciones
              </Text>
              {'\n'}
              <Text style={styles.noCameraLink}
                onPress={() => this.props.onGalleryPress?.()}>
                O aquí para acceder a la galería
              </Text>
              {'\n\n'}
              <Text style={{fontSize: 10}}>
                Si ya concedió permisos a la cámara y sigue viendo esta pantalla, reinicie la aplicación
              </Text>
            </Text>
          </View>
        );

      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return (
          <View
            style={styles.CameraLayout}
          >
            <View
              style={{backgroundColor: 'green', flex: 1}}

            >
              <View
                style={{flex: 1}}
              >
                <RNCamera
                  style={{flex: 1}}
                  ref={ref => this.rnCameraRef = ref}
                  captureAudio={this.state.microphonePermission === RESULTS.GRANTED}
                  playSoundOnCapture={true}
                  playSoundOnRecord={true}
                />
                <Animated.View
                  style={[
                    styles.fadingContainer,
                    {opacity: this.state.fadeAnimation}
                  ]}
                >
              </Animated.View>
              </View>
              <View style={{position: 'absolute', width: '100%', alignItems: 'center'}}>
                <RecordTimer ref={ref => this.recordTimerRef = ref}/>
              </View>
            </View>

            <View style={{flex: 0, flexDirection: 'row', padding: 30}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Pressable onPress={() => this.props.onGalleryPress?.()}>
                  <GalleryButton
                    ref={ref => this.galleryButtonRef = ref}
                    startCount={this.props.selectedItemsCount}/>
                </Pressable>
              </View>

              <View style={{flex: 2, alignItems: 'center'}}>
                <CaptureButton size={50}
                  animateRecord={this.props.canRecord}
                  onLongPress={() => this._onStartRecording()}
                  onPressOut={() => this._onCapture()}/>
              </View>
              <View style={{flex: 1}}></View>
            </View>



          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  noCameraLayout: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  noCameraLink: {
    color:'blue',
    textDecorationLine: 'underline'
  },
  CameraLayout: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  fadingContainer: {
    position: 'absolute',
    left: -10,
    width: 1000,
    height: 1000,
    zIndex: 999,
    backgroundColor:'#fff'
  }
});
