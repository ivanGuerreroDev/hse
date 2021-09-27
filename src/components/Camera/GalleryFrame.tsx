import React, { Component } from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { PhotoIdentifier } from '@react-native-community/cameraroll';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  photoIdentifier: PhotoIdentifier;
  selected?: boolean;
};

export default class Galleryframe extends Component<Props> {
  private _onPress = (event: GestureResponderEvent) => this.props.onPress?.(event);

  render() {
    let videoIcon: JSX.Element | undefined = undefined;
    if (this.props.photoIdentifier.node.type.includes('video')) {
      videoIcon =
        <View style={styles.galleryFrameVideoIcon}>
          <Icon type='material' name='videocam' color='white'/>
        </View>
    }

    return (
      <View style={styles.galleryFrame}>
        <Pressable
          style={[{flex: 1}, this.props.selected ? styles.pressedGalleryFrame : undefined]}
          onPress={(event) => this._onPress(event)}
        >
          <Image source={{uri: this.props.photoIdentifier.node.image.uri}} style={{flex: 1}}/>
          {videoIcon}
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  galleryFrame: {
    height: 80,
    width: 80,
    paddingHorizontal: 4
  },
  galleryFrameVideoIcon: {
    bottom: 0,
    left: 1,
    position: 'absolute'
  },
  pressedGalleryFrame: {
    borderColor: 'orange',
    borderWidth: 2
  }
});
