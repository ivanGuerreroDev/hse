import React, { FC } from 'react';
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

const GalleryFrame: FC<Props> = (props: Props) => {
  const _onPress = (event: GestureResponderEvent) => props.onPress?.(event);

  let videoIcon: JSX.Element | undefined = undefined;
  if (props.photoIdentifier.node.type.includes('video')) {
    videoIcon =
      <View style={styles.galleryFrameVideoIcon}>
        <Icon type='material' name='videocam' color='white'/>
      </View>
  }

  return (
    <View style={styles.galleryFrame}>
      <Pressable
        style={[{flex: 1}, props.selected ? styles.pressedGalleryFrame : undefined]}
        onPress={(event) => _onPress(event)}
      >
        <Image source={{uri: props.photoIdentifier.node.image.uri}} style={{flex: 1}}/>
        {videoIcon}
      </Pressable>
    </View>
  );
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

export default GalleryFrame;
