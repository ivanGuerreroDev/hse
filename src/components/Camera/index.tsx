import React, { Component } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton';
import FloatingGallery from './FloatingGallery';
import Gallery from './Gallery';

type Props = {
  selectedUris?: Array<string>;
  onCancel: () => void;
  onSuccess: (output: Array<string>) => void;
};

export default class Camera extends Component<Props> {
  camera: RNCamera | null = null;
  state = {
    isRecording: false,
    duration: 0,
    selectedItems: new Array<string>(),
    galleryMode: false
  };

  constructor(props: Props) {
    super(props);

    this.state.selectedItems = props.selectedUris || [];
  }

  endCapture() {
    const state = this.state;

    if (state.isRecording) {
      this.camera?.stopRecording();
    }
    else {
      this.camera?.takePictureAsync()
        .then(response => {
          this.setState({
            selectedItems: [
              ...state.selectedItems,
              response.uri
            ]
          });
        });
    }

    this.setState({isRecording: false, duration: 0});
  }

  startRecord() {
    this.setState({isRecording: true});
    const recordInterval = setInterval(() => {
      this.setState({duration: this.state.duration + 1});
    }, 1000);

    this.camera?.recordAsync()
      .then(response => {
        this.setState({
          selectedItems: [
            ...this.state.selectedItems,
            response.uri
          ]
        });
      })
      .finally(() => {
        clearInterval(recordInterval);
      });
  }

  pressItem(itemUri: string) {
    if (this.state.selectedItems.includes(itemUri))
      this.setState({
        selectedItems: [
          ...this.state.selectedItems
            .filter(item => item !== itemUri)
        ]
      });
    else
      this.setState({
        selectedItems: [
          ...this.state.selectedItems,
          itemUri
        ]
      });
  }

  render() {
    const state = this.state;

    let timer: JSX.Element | undefined = undefined;
    if (state.isRecording) {
      timer =
        <View style={styles.timerBackground}>
          <Text style={styles.timerCaption}>
            {
              new Date(0, 0, 0, 0, 0,
                state.duration
              ).toLocaleTimeString()
            }
          </Text>
        </View>
    }

    const cameraMode: JSX.Element = <>
      <View style={{flex: 1, padding: 5}}>
        <View style={{backgroundColor: 'green', flex: 1}}>
          <RNCamera style={{flex: 1}}
            ref={camera => this.camera = camera}/>

          <FloatingGallery
            onPressItem={(event) => this.pressItem(event.pressedItemUri)}
            selectedItemsUri={this.state.selectedItems}/>
        </View>
      </View>
      <View style={{flex: 0, flexDirection: 'row', padding: 30}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Pressable onPress={() => this.setState({galleryMode: true})}>
            <Icon type='material' name='collections' size={32} color='white'/>
            <Text style={styles.selectedCounter}>
              {state.selectedItems.length || 0}
            </Text>
          </Pressable>
        </View>

        <View style={{flex: 2, alignItems: 'center'}}>
          <CaptureButton size={50} animateRecord={true}
            onLongPress={() => true && this.startRecord()}
            onPressOut={() => this.endCapture()}/>
        </View>

        <View style={{flex: 1}}></View>
      </View>
    </>

    const galleryMode: JSX.Element =
      <Gallery
        onPressReturn={() => this.setState({galleryMode: false})}
        onPressItem={(event) => this.pressItem(event.pressedItemUri)}
        selectedItemsUri={this.state.selectedItems}/>

    const showMode: JSX.Element = this.state.galleryMode ? galleryMode : cameraMode;

    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <Header
          containerStyle={{borderBottomWidth: 0}}
          statusBarProps={{
            animated: true,
            hidden: true
          }}
          backgroundColor='transparent'
          centerComponent={timer}
          leftComponent={
            <Icon type='material' name='close' color='white'
              onPress={() => this.props.onCancel()}/>
          }
          rightComponent={
            <Icon type='material' name='done' color='white'
              onPress={() => this.props.onSuccess(this.state.selectedItems)}/>
          }
        />
        {showMode}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  timerBackground: {
    backgroundColor: 'red',
    height: 30,
    padding: 6,
    borderRadius: 14,
    alignContent: 'center',
    justifyContent: 'center'
  },
  timerCaption: {
    color: 'white',
    fontSize: 14
  },
  selectedCounter: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FDAE01',
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    bottom: -4,
    right: -4
  }
});
