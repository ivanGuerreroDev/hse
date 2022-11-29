import React, {useEffect, useState, memo} from 'react';
import {View} from 'react-native';
import ControlComponent, {Props} from '../ControlComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import SignComponent from 'components/Sign';

export default class SignControl extends ControlComponent {
  render() {
    return <MemoSignControlComp {...this.props} />
  }
}
interface Props {
  controlBridge: any;
}
const SignControlComp = (props: Props) => {

  const [state, setState] = useState({
    filter: '',
    onEdit: false,
    color: '',
    cargo: ''
  })

  const { controlBridge, navigation } = props;
  /*controlBridge.OutputValue = controlBridge.property('data')
      ? controlBridge.property('data')
      : controlBridge.OutputValue;*/
  let errorMessage: string =
        controlBridge.property('validate') &&
        controlBridge.OutputValue !== undefined
          ? controlBridge.validateOutputValue() || ''
          : '';
  const errorHeight: number = errorMessage && !state.onEdit ? 15 : 0;
  let newData = controlBridge.property('data')
      ? controlBridge.property('data')
      : controlBridge.OutputValue;

  /*useEffect(() => {
    if (controlBridge.OutputValue !== controlBridge.property('data')) {
      controlBridge.OutputValue = controlBridge.property('data');
    }
  },[controlBridge])*/

  const handleGoToSign = () => {
    navigation.navigate(
      'Modal',
      <SignComponent
        onCancel={() => navigation.goBack()}
        onSuccess={item=>{
          const media = controlBridge.createResource(item);
          controlBridge.OutputValue = {
            ...controlBridge.RawOutputValue,
            media: media,
          };
          navigation.goBack();
        }}
        controlBridge={controlBridge}
      />,
    );
  }

  return (
    <View style={{justifyContent:'center', flexDirection:'row'}}>
      <Button
        buttonStyle={{backgroundColor: '#FDAE01'}}
        onPress={handleGoToSign}
        disabled={controlBridge?.OutputValue?.media}
        icon={
          <Icon
              name="edit"
              size={18}
              color="white"
              style={{marginRight:8}}
            />
        }
        title={controlBridge.property('title').toUpperCase()}
      />
    </View>
  )

}
const MemoSignControlComp = SignControlComp;
