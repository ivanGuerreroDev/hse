import React from 'react';
import ControlComponent from '../ControlComponent';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Camera from 'components/Camera';

export default class RemarksControl extends ControlComponent {
  render() {
    return (
      <View>
        <Text onPress={() => {
          this.props.navigation.navigate('Modal',
            <Camera
              onCancel={() => this.props.navigation.goBack()}
              onSuccess={(items: any) => {
                console.log(JSON.stringify(items));
                this.props.navigation.goBack();
              }}
            />
          )
        }}
        >la cámara</Text>
      </View>
    );
  }
}
