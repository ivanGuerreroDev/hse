import React, { FC, useCallback, useState } from 'react';
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

const FloatingGallery: FC<Props> = (props: Props) => {
  const [photoIdentifiersState, setPhotoIdentifiersState] = useState<Array<PhotoIdentifier>>([]);

  _getGallery()
    .then(response => {
      setPhotoIdentifiersState(response);
    })
    .catch(error => console.warn(error));

  const keyExtractorCallback = useCallback((item, index) => index.toString(), []);

  const renderItemCallback = useCallback(({item}) =>
    <GalleryFrame photoIdentifier={item}
      selected={props.selectedItemsUri?.includes(item.node.image.uri)}
      onPress={() => props.onPressItem?.({pressedItemUri: item.node.image.uri})}
    />, [props.selectedItemsUri])

  return (
    <View style={styles.floatingContainer}>
      <FlatList
        data={photoIdentifiersState}
        keyExtractor={keyExtractorCallback}
        horizontal={true}
        maxToRenderPerBatch={8}
        renderItem={renderItemCallback}/>
    </View>
  );
}

const _getGallery: () => Promise<Array<PhotoIdentifier>> = async () => {
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

const styles = StyleSheet.create({
  floatingContainer: {
    bottom: -25,
    position: 'absolute',
    width: '100%'
  }
});

export default FloatingGallery;
