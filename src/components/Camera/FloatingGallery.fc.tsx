import React, { Component, FC, useCallback, useState } from 'react';
import { FlatList, GestureResponderEvent, Image, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import CameraRoll, { GetPhotosParams, PhotoIdentifier } from '@react-native-community/cameraroll';
import { Icon } from 'react-native-elements/dist/icons/Icon';

type FloatingFrameProps = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  photoIdentifier: PhotoIdentifier;
  selected?: boolean;
};

const FloatingFrame: FC<FloatingFrameProps> = (props: FloatingFrameProps) => {
  const _onPress = (event: GestureResponderEvent) => props.onPress?.(event);

  let videoIcon: JSX.Element | undefined = undefined;
  if (props.photoIdentifier.node.type.includes('video')) {
    videoIcon =
      <View style={styles.floatingFrameVideoIcon}>
        <Icon type='material' name='videocam' color='white'/>
      </View>
  }

  return (
    <View style={styles.floatingFrame}>
      <Pressable
        style={[{flex: 1}, props.selected ? styles.pressedFloatingFrame : undefined]}
        onPress={(event) => _onPress(event)}
      >
        <Image source={{uri: props.photoIdentifier.node.image.uri}} style={{flex: 1}}/>
        {videoIcon}
      </Pressable>
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

export interface FloatingGalleryPressItemEvent {
  pressedItemUri: string;
};

type FloatingGalleryProps = {
  onPressItem?: ((event: FloatingGalleryPressItemEvent) => void) | undefined;
  selectedItemsUri?: Array<string>;
};

const FloatingGallery: FC<FloatingGalleryProps> = (props: FloatingGalleryProps) => {
  const [photoIdentifiersState, setPhotoIdentifiersState] = useState<Array<PhotoIdentifier>>([]);

  _getGallery()
    .then(response => {
      setPhotoIdentifiersState(response);
    })
    .catch(error => console.warn(error));

  const keyExtractorCallback = useCallback((item, index) => index.toString(), []);

  const renderItemCallback = useCallback(({item}) =>
    <FloatingFrame photoIdentifier={item}
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

export default FloatingGallery;
