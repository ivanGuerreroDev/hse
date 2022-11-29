import React, { Component } from 'react';
import { Dimensions, FlatList, Linking, SectionList, StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import GalleryFrame from './GalleryFrame';
import _, { result, toInteger } from 'lodash';
import { getCachedMedia, getGalleryMedia, MediaUri } from './helper';
import { checkGalleryAccessPermission } from 'utils/permissions';
import { PermissionStatus, RESULTS } from 'react-native-permissions';

type Props = {
  onPressReturn?: (() => void) | undefined;
  onSelectMedia?: (mediaUri: string) => void;
  onUnselectMedia?: (mediaUri: string) => void;
  selectedItemsUri?: Array<string>;
};

type State = {
  galleryPermission: PermissionStatus;
  cachedUris: Array<MediaUri>;
  galleryUris: Array<MediaUri>;
  selectedItemsCounter: number;
};

export default class Gallery extends Component<Props, State> {
  state: State = {
    galleryPermission: RESULTS.UNAVAILABLE,
    cachedUris: new Array<MediaUri>(),
    galleryUris: new Array<MediaUri>(),
    selectedItemsCounter: 0
  };

  constructor(props: Props) { console.debug('construct Gallery');
    super(props);

    checkGalleryAccessPermission()
      .then(result => {
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          Promise.all([getCachedMedia(), getGalleryMedia()])
            .then(response => {
              this.setState({
                galleryPermission: result,
                cachedUris: response[0],
                galleryUris: response[1],
                selectedItemsCounter: props.selectedItemsUri?.length || 0
              });
            })
            .catch(error => console.error(error));
        }
        else
          this.setState({
            galleryPermission: result,
            selectedItemsCounter: props.selectedItemsUri?.length || 0
          });
      });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !_.isEqual(nextState, this.state);
  }

  render() { console.debug(`render Gallery, with ${this.state.cachedUris.length+this.state.galleryUris.length} media files`);
    switch (this.state.galleryPermission) {
      case RESULTS.UNAVAILABLE:
        return (
          <View style={styles.noGalleryLayout}>
            <Text style={{textAlign: 'center'}}>
              <Text>Galería no disponible</Text>
              {'\n'}
              <Text style={styles.noGalleryLink}
                onPress={() => this.props.onPressReturn?.()}>
                Presione aquí para volver a la cámara
              </Text>
            </Text>
          </View>
        );

      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
        return (
          <View style={styles.noGalleryLayout}>
            <Text style={{textAlign: 'center'}}>
              <Text>No tiene permisos para acceder a la galería</Text>
              {'\n'}
              <Text style={styles.noGalleryLink}
                onPress={() => Linking.openSettings()}>
                Presione aquí para ir a configuraciones
              </Text>
              {'\n'}
              <Text style={styles.noGalleryLink}
                onPress={() => this.props.onPressReturn?.()}>
                O aquí para volver a la cámara
              </Text>
              {'\n\n'}
              <Text style={{fontSize: 10}}>
                Si ya concedió permisos a la cámara y sigue viendo esta pantalla, reinicie la aplicación
              </Text>
            </Text>
          </View>
        );

      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        const SectionDataList = (list: Array<MediaUri>) =>
          <FlatList
            data={list}
            keyExtractor={(item, index) => index.toString()}
            numColumns={toInteger(Dimensions.get('window').width/100)}
            renderItem={({item}) =>
              <GalleryFrame
                imageUri={item.uri}
                isVideo={item.isVideo}
                size={100}
                selected={this.props.selectedItemsUri?.includes(item.uri)}
                onSelect={() => {
                  this.props.onSelectMedia?.(item.uri);
                  this.setState({selectedItemsCounter: this.state.selectedItemsCounter+1});
                }}
                onUnselect={() => {
                  this.props.onUnselectMedia?.(item.uri);
                  this.setState({selectedItemsCounter: this.state.selectedItemsCounter-1});
                }}
              />
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
                  {`${this.state.selectedItemsCounter} Items Seleccionados`}
                </Text>
              </View>
            </View>

            <SectionList
              sections={[
                {
                  title: 'Zimexa',
                  data: [
                    {
                      list: this.state.cachedUris
                    }
                  ]
                },
                {
                  title: 'Galería',
                  data: [
                    {
                      list: this.state.galleryUris
                    }
                  ]
                }
              ]}
              keyExtractor={(item, index) => index.toString()}
              renderSectionHeader={({section}) => SectionHeader(section.title)}
              renderSectionFooter={() => <View style={{height: 20}}/>}
              renderItem={({item}) => SectionDataList(item.list)}
              />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  noGalleryLayout: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  noGalleryLink: {
    color:'blue',
    textDecorationLine: 'underline'
  },
  GalleryLayout: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  }
});
