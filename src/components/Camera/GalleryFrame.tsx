import React, { FC } from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  imageUri: string;
  isVideo?: boolean;
  selected?: boolean;
  size: number;
};

const GalleryFrame: FC<Props> = (props: Props) => {
  const _onPress = (event: GestureResponderEvent) => props.onPress?.(event);

  let videoIcon: JSX.Element | undefined = undefined;
  if (props.isVideo) {
    videoIcon =
      <View style={styles.galleryFrameVideoIcon}>
        <Icon type='material' name='videocam' color='white'/>
      </View>
  }

  return (
    <View style={{
      height: props.size,
      width: props.size-props.size/20,
      padding: props.size/20
    }}>
      <Pressable
        style={[{flex: 1}, props.selected ? styles.pressedGalleryFrame : undefined]}
        onPress={(event) => _onPress(event)}
      >
        <Image source={{uri: props.imageUri}} style={{flex: 1}}
          testID={'thumbnail-image-background'}/>
        {videoIcon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  galleryFrameVideoIcon: {
    bottom: 0,
    left: 1,
    position: 'absolute'
  },
  pressedGalleryFrame: {
    borderColor: '#FDAE01',
    borderWidth: 2
  }
});

export default GalleryFrame;
