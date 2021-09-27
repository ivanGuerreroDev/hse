import React, { Component } from 'react';
import { FlatList, GestureResponderEvent, Image, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import CameraRoll, { GetPhotosParams, PhotoIdentifier } from '@react-native-community/cameraroll';
import { Icon } from 'react-native-elements/dist/icons/Icon';

type FloatingFrameProps = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  photoIdentifier: PhotoIdentifier;
  selected?: boolean;
};

class FloatingFrame extends Component<FloatingFrameProps> {
  private _onPress = (event: GestureResponderEvent) => this.props.onPress?.(event);

  render() {
    let videoIcon: JSX.Element | undefined = undefined;
    if (this.props.photoIdentifier.node.type.includes('video')) {
      videoIcon =
        <View style={styles.floatingFrameVideoIcon}>
          <Icon type='material' name='videocam' color='white'/>
        </View>
    }

    return (
      <View style={styles.floatingFrame}>
        <Pressable
          style={[{flex: 1}, this.props.selected ? styles.pressedFloatingFrame : undefined]}
          onPress={(event) => this._onPress(event)}
        >
          <Image source={{uri: this.props.photoIdentifier.node.image.uri}} style={{flex: 1}}/>
          {videoIcon}
        </Pressable>
      </View>
    );
  }
}

export interface FloatingGalleryPressItemEvent {
  pressedItemUri: string;
};

type FloatingGalleryProps = {
  onPressItem?: ((event: FloatingGalleryPressItemEvent) => void) | undefined;
  selectedItemsUri?: Array<string>;
};

export default class FloatingGallery extends Component<FloatingGalleryProps> {
  state = {
    photoIdentifiers: new Array<PhotoIdentifier>()
  };

  private _getGallery: () => Promise<Array<PhotoIdentifier>> = async () => {
    let CameraRollOptions: GetPhotosParams = {
      first: 10
    };
    let photoIdentifiers: Array<PhotoIdentifier> = [];
    let nextPage: boolean = true;

    while (nextPage) {
      const photoIdentifiersPage = await CameraRoll.getPhotos(CameraRollOptions);
      photoIdentifiers.push(...photoIdentifiersPage.edges);

      if (photoIdentifiersPage.page_info.has_next_page) {
        CameraRollOptions = {
          ...CameraRollOptions,
          after: photoIdentifiersPage.page_info.end_cursor
        };
      }

      nextPage = photoIdentifiersPage.page_info.has_next_page;
    }

    return photoIdentifiers;
  }

  render() {
    this._getGallery()
      .then(response => this.setState({photoIdentifiers: response}))
      .catch(error => console.warn(error));

    return (
      <View style={styles.floatingContainer}>
        <FlatList
          data={this.state.photoIdentifiers}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          maxToRenderPerBatch={8}
          renderItem={({item}) =>
            <FloatingFrame photoIdentifier={item}
              selected={this.props.selectedItemsUri?.includes(item.node.image.uri)}
              onPress={() => this.props.onPressItem?.({pressedItemUri: item.node.image.uri})}
            />
          }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatingContainer: {
    bottom: -25,
    position: 'absolute',
    width: '100%'
  },
  floatingFrame: {
    height: 80,
    width: 80,
    paddingHorizontal: 4
  },
  floatingFrameVideoIcon: {
    bottom: 0,
    left: 1,
    position: 'absolute'
  },
  pressedFloatingFrame: {
    borderColor: 'orange',
    borderWidth: 2
  }
});
