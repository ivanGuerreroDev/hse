import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Camera from './Camera';
import FloatingGallery from './FloatingGallery';
import Gallery from './Gallery';

type Props = {
  selectedMediaUris?: Array<string>;
  canRecord?: boolean;
  showFloatingGallery?: boolean;
  onCancel: () => void;
  onSuccess: (output: Array<string>) => void;
};

type State = {
  selectedMediaUris: Array<string>;
  showMode: 'camera' | 'gallery';
};

export default class MediaSelector extends Component<Props, State> {
  cameraRef: Camera | null = null;

  state: State = {
    selectedMediaUris: new Array<string>(),
    showMode: 'camera'
  };

  constructor(props: Props) { console.debug('Construct MediaSelector');
    super(props);

    this.state.selectedMediaUris = props.selectedMediaUris || [];
  }

  addMediaUri(mediaUri: string) {
    this.cameraRef?.galleryButtonRef?.addCount();
    this.setState({selectedMediaUris: [
      ...this.state.selectedMediaUris,
      mediaUri
    ]});
  }

  removeMediaUri(mediaUri: string) {
    this.cameraRef?.galleryButtonRef?.removeCount();
    this.setState({selectedMediaUris: [
      ...this.state.selectedMediaUris
        .filter(uri => uri !== mediaUri)
    ]});
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.showMode != this.state.showMode;
  }

  render() { console.debug('Render MediaSelector');
    let showFloatingGallery: JSX.Element | undefined = undefined;
    if (this.props.showFloatingGallery) {
      showFloatingGallery =
        <FloatingGallery
          selectedItemsUri={this.state.selectedMediaUris}
          onSelectMedia={mediaUri => this.addMediaUri(mediaUri)}
          onUnselectMedia={mediaUri => this.removeMediaUri(mediaUri)}/>
    }
    const showCameraMode: JSX.Element = (
      <View style={{flex: 1}}>
        <Camera canRecord={this.props.canRecord}
          ref={ref => this.cameraRef = ref}
          selectedItemsCount={this.state.selectedMediaUris.length}
          onCaptureMedia={mediaUri => this.addMediaUri(mediaUri)}
          onGalleryPress={() => this.setState({showMode: 'gallery'})}/>

          {showFloatingGallery}
      </View>
    );

    const showGalleryMode: JSX.Element = (
      <Gallery
        selectedItemsUri={this.state.selectedMediaUris}
        onPressReturn={() => this.setState({showMode: 'camera'})}
        onSelectMedia={mediaUri => this.addMediaUri(mediaUri)}
        onUnselectMedia={mediaUri => this.removeMediaUri(mediaUri)}/>
    );

    const showMode: JSX.Element = this.state.showMode === 'camera' ? showCameraMode : showGalleryMode;

    return (
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <Header
          containerStyle={{borderBottomWidth: 0}}
          statusBarProps={{
            animated: true,
            hidden: true
          }}
          backgroundColor='transparent'
          leftComponent={
            <Icon type='material' name='close' color='white'
              onPress={() => this.props.onCancel()}/>
          }
          rightComponent={
            <Icon type='material' name='done' color='white'
              onPress={() => this.props.onSuccess(this.state.selectedMediaUris)}/>
          }
        />
        {showMode}
      </SafeAreaView>
    );
  }
}
