import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CameraRoll, { GetPhotosParams, PhotoIdentifier } from '@react-native-community/cameraroll';
import GalleryFrame from './GalleryFrame';

export interface FloatingGalleryPressItemEvent {
  pressedItemUri: string;
};

type Props = {
  onPressItem?: ((event: FloatingGalleryPressItemEvent) => void) | undefined;
  selectedItemsUri?: Array<string>;
};

export default class FloatingGallery extends Component<Props> {
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

  constructor(props: Props) {
    super(props);

    this._getGallery()
      .then(response => this.setState({photoIdentifiers: response}))
      .catch(error => console.warn(error));
  }

  render() {
    return (
      <View style={styles.floatingContainer}>
        <FlatList
          data={this.state.photoIdentifiers}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          maxToRenderPerBatch={8}
          renderItem={({item}) =>
            <GalleryFrame
              imageUri={item.node.image.uri}
              size={80}
              isVideo={item.node.type.includes('video')}
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
  }
});
