import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import GalleryFrame from './GalleryFrame';
import { getGalleryMedia, MediaUri } from './helper';
import _ from 'lodash';
import { checkGalleryAccessPermission } from 'utils/permissions';
import { RESULTS } from 'react-native-permissions';

type Props = {
    onSelectMedia?: (mediaUri: string) => void;
    onUnselectMedia?: (mediaUri: string) => void;
    selectedItemsUri?: Array<string>;
};

type State = {
    mediaUris: Array<MediaUri>;
};

export default class FloatingGallery extends Component<Props, State> {
    state: State = {
        mediaUris: new Array<MediaUri>()
    };

    constructor(props: Props) {
        console.debug('Construct FloatingGallery');
        super(props);

        checkGalleryAccessPermission().then((result) => {
            if (result === RESULTS.GRANTED || result === RESULTS.LIMITED)
                getGalleryMedia()
                    .then((response) => this.setState({ mediaUris: response }))
                    .catch((error) => console.error(error));
        });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return (
            !_.isEqual(nextState, this.state) ||
            !_.isEqual(nextProps.selectedItemsUri, this.props.selectedItemsUri)
        );
    }

    render() {
        console.debug(
            `render FloatingGallery, with ${this.state.mediaUris.length} media files`
        );
        return (
            <View style={styles.floatingContainer}>
                <FlatList
                    data={this.state.mediaUris}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    maxToRenderPerBatch={8}
                    renderItem={({ item }) => (
                        <GalleryFrame
                            imageUri={item.uri}
                            size={80}
                            isVideo={item.isVideo}
                            selected={this.props.selectedItemsUri?.includes(
                                item.uri
                            )}
                            onSelect={() =>
                                this.props.onSelectMedia?.(item.uri)
                            }
                            onUnselect={() =>
                                this.props.onUnselectMedia?.(item.uri)
                            }
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    floatingContainer: {
        bottom: 95,
        position: 'absolute',
        zIndex: 800,
        width: '100%'
    }
});
