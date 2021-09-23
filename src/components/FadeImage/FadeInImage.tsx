import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  View,
} from 'react-native';
import {useAnimation} from './useAnimation';

interface Props {
  uri: string;
  image: any;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, image = {}}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View
    /* style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
      }} */
    >
      {/* {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="#ffffff"
          size={25}
        />
      )} */}
      <Animated.Image
        source={uri}
        onError={onError}
        onLoad={finishLoading}
        resizeMode="contain"
        style={image}
      />
    </View>
  );
};
