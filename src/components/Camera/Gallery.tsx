import _ from 'lodash';
import React, { FC, useState, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import GalleryFrame from './GalleryFrame';
import CameraRoll, { GetPhotosParams, PhotoIdentifier } from '@react-native-community/cameraroll';
import fs from 'react-native-fs';

export interface GalleryPressItemEvent {
  pressedItemUri: string;
};

interface IAllImages {
  cached: Array<string>;
  gallery: Array<string>;
};

type Props = {
  onPressItem?: ((event: GalleryPressItemEvent) => void) | undefined;
  onPressReturn?: (() => void) | undefined;
  selectedItemsUri?: Array<string>;
};

const Gallery: FC<Props> = (props: Props) => {
  const [imagesState, setImagesState] = useState<IAllImages>({cached: [], gallery: []});

  const responseImagesCallback = useCallback(
    response => setImagesState(response), []
  );

  _getImages()
    .then(responseImagesCallback)
    .catch(error => console.warn(error));

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <View style={{flex: 0, flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1}}>
        <Button
          title='Volver a la cámara'
          icon={<Icon type='material' name='arrow-back' color='white' size={16}/>}
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{flex: 0}}
          titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold'}}
          onPress={() => props.onPressReturn?.()}/>

        <View style={{flex: 1}}></View>

        <View style={{flex: 0, justifyContent: 'center'}}>
          <Text style={{flex: 0, color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            {`${props.selectedItemsUri?.length || 0} Items Seleccionados`}
          </Text>
        </View>
      </View>

      <ScrollView style={{paddingTop: 20}}>
        <RenderGroupImages
          imagesUri={imagesState.cached}
          groupName='Zimexa'
          onPressItem={(event) => props.onPressItem?.(event)}
          selectedItemsUri={props.selectedItemsUri}/>
        <RenderGroupImages
          imagesUri={imagesState.gallery}
          groupName='Galería'
          onPressItem={(event) => props.onPressItem?.(event)}
          selectedItemsUri={props.selectedItemsUri}/>
      </ScrollView>
    </View>
  );
}

const _getImages: () => Promise<IAllImages> = async () => {
  const cachedItems = await fs.readDir(fs.CachesDirectoryPath);
  const cachedCameraDir = cachedItems.find(item => item.name === 'Camera');

  let cachedImages: Array<string> = [];
  if (cachedCameraDir) {
    cachedImages = (await fs.readDir(cachedCameraDir.path))
      .map(item => item.path);
  }

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

  return {
    cached: cachedImages,
    gallery: photoIdentifiers.map(item => item.node.image.uri)
  }
};

type GroupImagesProps = {
  imagesUri: Array<string>;
  groupName: string;
  onPressItem?: ((event: GalleryPressItemEvent) => void) | undefined;
  selectedItemsUri?: Array<string>;
};

const RenderGroupImages: FC<GroupImagesProps> = (props: GroupImagesProps) => {
  const renderImageFrameCallback = useCallback(
    (imageUri: string, index: number) => {
      const fileExtension = _.last(imageUri.split('.'));

      return <GalleryFrame
        key={index}
        imageUri={imageUri}
        isVideo={['mp4', 'mov'].includes(fileExtension || '')}
        onPress={() => props.onPressItem?.({pressedItemUri: imageUri})}
        selected={props.selectedItemsUri?.includes(imageUri)}
        size={100}
      />
    }, [props.selectedItemsUri]
  );

  return (
    <View>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{props.groupName}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {props.imagesUri.map(renderImageFrameCallback)}
      </View>
    </View>
  );
};

export default Gallery;
