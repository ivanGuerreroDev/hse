import React, { Component } from 'react';
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

export default class GalleryFrame extends Component<Props> {
  constructor(props: Props) { console.log('construct gallery frame', props.imageUri);
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.selected !== nextProps.selected;
  }

  render() { console.log('render gallery frame', this.props.imageUri);
    const props = this.props;

    let videoIcon: JSX.Element | undefined = undefined;
    if (props.isVideo) {
      videoIcon =
        <View style={styles.galleryFrameVideoIcon}>
          <Icon type='material' name='videocam' color='white' size={props.size/4}/>
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
          onPress={(event) => props.onPress?.(event)}
        >
          <Image source={{uri: props.imageUri}} style={{ width: '100%', height: '100%'}}/>
          {videoIcon}
        </Pressable>
      </View>
    );
  }
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
