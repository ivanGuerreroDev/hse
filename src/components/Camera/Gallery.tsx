import _, { toInteger } from 'lodash';
import React, { Component } from 'react';
import { Dimensions, FlatList, SectionList, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import GalleryFrame from './GalleryFrame';
import CameraRoll, { GetPhotosParams } from '@react-native-community/cameraroll';
import fs from 'react-native-fs';

export interface GalleryPressItemEvent {
  pressedItemUri: string;
};

interface IImagesSection {
  title: string;
  data: Array<{
    list: Array<{
      imageUri: string,
      isVideo: boolean
    }>
  }>
};

type Props = {
  onPressItem?: ((event: GalleryPressItemEvent) => void) | undefined;
  onPressReturn?: (() => void) | undefined;
  selectedItemsUri?: Array<string>;
};

export default class Gallery extends Component<Props> {
  state = {
    images: new Array<IImagesSection>()
  };

  constructor(props: Props) { console.log('construct gallery');
    super(props);

    _getImages()
      .then(response => this.setState({images: response}))
      .catch(error => console.warn(error));
  }

  render() {
    const SectionDataList = (list: Array<{imageUri: string, isVideo: boolean}>) =>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        numColumns={toInteger(Dimensions.get('window').width/100)}
        renderItem={({item}) =>
        <View style={{borderColor: 'white', borderWidth: 2}}>
          <GalleryFrame
            imageUri={item.imageUri}
            isVideo={item.isVideo}
            size={100}
            selected={this.props.selectedItemsUri?.includes(item.imageUri)}
            onPress={() => this.props.onPressItem?.({pressedItemUri: item.imageUri})}
          />
        </View>
      }/>;

    const SectionHeader = (title: string) =>
      <View style={{borderBottomWidth: 1, borderColor: 'white', marginVertical: 5}}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>

    return (
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={{flex: 0, flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 1}}>
          <Button
            title='Volver a la cámara'
            icon={<Icon type='material' name='arrow-back' color='white' size={16}/>}
            buttonStyle={{backgroundColor: 'transparent'}}
            containerStyle={{flex: 0}}
            titleStyle={{color: 'white', fontSize: 14, fontWeight: 'bold'}}
            onPress={() => this.props.onPressReturn?.()}/>

          <View style={{flex: 1}}></View>

          <View style={{flex: 0, justifyContent: 'center'}}>
            <Text style={{flex: 0, color: 'white', fontSize: 14, fontWeight: 'bold'}}>
              {`${this.props.selectedItemsUri?.length || 0} Items Seleccionados`}
            </Text>
          </View>
        </View>

        <SectionList
          sections={this.state.images}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({section}) => SectionHeader(section.title)}
          renderSectionFooter={() => <View style={{height: 20}}/>}
          renderItem={({item}) => SectionDataList(item.list)}
          />
      </View>
    );
  }
}

const _getImages: () => Promise<Array<IImagesSection>> = async () => {
  const cachedItems = await fs.readDir(fs.CachesDirectoryPath);
  const cachedCameraDir = cachedItems.find(item => item.name === 'Camera');

  let cachedImagesSection: IImagesSection = {
    title: 'Zimexa',
    data: [
      {
        list: []
      }
    ]
  };
  if (cachedCameraDir) {
    (await fs.readDir(cachedCameraDir.path))
      .forEach(item => cachedImagesSection.data[0].list.push({
        imageUri: item.path,
        isVideo: ['mp4', 'mov'].includes(_.last(item.name.split('.')) || '')
      }));
  }

  let CameraRollOptions: GetPhotosParams = {
    first: 10
  };
  let galleryImagesSection: IImagesSection = {
    title: 'Galería',
    data: [
      {
        list: []
      }
    ]
  };
  let nextPage: boolean = true;

  while (nextPage) {
    const photoIdentifiersPage = await CameraRoll.getPhotos(CameraRollOptions);
    photoIdentifiersPage.edges.forEach(item => {
      galleryImagesSection.data[0].list.push({
        imageUri: item.node.image.uri,
        isVideo: item.node.type.includes('video')
      });
    });

    if (photoIdentifiersPage.page_info.has_next_page) {
      CameraRollOptions = {
        ...CameraRollOptions,
        after: photoIdentifiersPage.page_info.end_cursor
      };
    }

    nextPage = photoIdentifiersPage.page_info.has_next_page;
  }

  let returnData: Array<IImagesSection> = [];
  if (cachedImagesSection.data[0].list.length > 0)
    returnData.push(cachedImagesSection);
  if (galleryImagesSection.data[0].list.length > 0)
    returnData.push(galleryImagesSection);

  return returnData;
};
