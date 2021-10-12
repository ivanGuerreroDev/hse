import React, { Component } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  onSelect?: () => void;
  onUnselect?: () => void;
  imageUri: string;
  isVideo?: boolean;
  selected?: boolean;
  size: number;
};

type State = {
  selected: boolean;
};

export default class GalleryFrame extends Component<Props, State> {
  state: State = {
    selected: false
  };

  constructor(props: Props) { console.debug(`construct GalleryFrame, path: ${props.imageUri}`);
    super(props);

    this.state.selected = props.selected || false;
  }

  onChangeSelected() {
    if (!this.state.selected) this.props.onSelect?.();
    else this.props.onUnselect?.();

    this.setState({selected: !this.state.selected});
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.selected !== nextState.selected;
  }

  render() { console.debug(`render GalleryFrame, path: ${this.props.imageUri}`);
    let videoIcon: JSX.Element | undefined = undefined;
    if (this.props.isVideo) {
      videoIcon =
        <View style={styles.galleryFrameVideoIcon}>
          <Icon type='material' name='videocam' color='white' size={this.props.size/4}/>
        </View>
    }

    return (
      <View style={{
        height: this.props.size,
        width: this.props.size-this.props.size/20,
        padding: this.props.size/20
      }}>
        <Pressable
          style={[{flex: 1}, this.state.selected ? styles.pressedGalleryFrame : undefined]}
          onPress={() => this.onChangeSelected()}
        >
          <Image source={{uri: this.props.imageUri}} style={{ width: '100%', height: '100%'}}/>
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
