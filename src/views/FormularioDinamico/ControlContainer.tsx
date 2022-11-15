import React, {Component} from 'react';
import {FlatList} from 'react-native';
import ControlComponent from './ControlComponent';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from 'types/navigations';
import _ from 'lodash';
import {ControlBridge} from 'utils/formulariodinamico/ControlBridge';

import CheckControl from './Controls/CheckControl';
import LabelControl from './Controls/LabelControl';
import ListControl from './Controls/ListControl';
import RemarksControl from './Controls/RemarksControl';
import TextControl from './Controls/TextControl';
import SelectControl from './Controls/SelectControl';

type MapControlBridgesProps = {
  controlBridges: ControlBridge[];
  path: string;
};

type NavigationProps = {
  navigation: StackNavigationProp<RootMainStackParamList, 'FormularioDinamico'>;
};

type Props = MapControlBridgesProps & NavigationProps;

export default class ControlContainer extends Component<Props> {
  memoizedOptions = _.memoize(controlMap => controlMap.map( (controlBridge: any, index: any) => ({controlBridge, index}) ))
  render() {
    const {controlBridges, path, navigation} = this.props;
    return (
      <FlatList
        data={
          this.memoizedOptions(mapControlBridges(
            controlBridges,
            path,
          ))
      }
        renderItem={({item}) => {
          return <MemoItemControlBridge dataControlBridge={item} navigation={navigation} parentProps={this.props} />
        }}
      />
    )
  }
}

type MapControlBridgesType = (
  controlBridges: ControlBridge[],
  path: string,
) => ControlBridge[];

const mapControlBridges: MapControlBridgesType = (
  controlBridges: ControlBridge[],
  path: string,
) => {
  return controlBridges
    ?.filter(controlBridge =>
      new RegExp(`^${path}.[0-9]+$`).test(controlBridge.Path),
    )
    ?.sort((a, b) => a.Control.order - b.Control.order);
};

type ControlComponentSelectType = (
  controlBridge: ControlBridge,
) => typeof ControlComponent;
const controlComponent: ControlComponentSelectType = (
  controlBridge: ControlBridge,
) => {
  let controlType = ControlComponent;
  switch (controlBridge.Control.type) {
    case 'Check':
      controlType = CheckControl;
      break;
    case 'Label':
      controlType = LabelControl;
      break;
    case 'List':
      controlType = ListControl;
      break;
    case 'Remarks':
      controlType = RemarksControl;
      break;
    case 'Text':
      controlType = TextControl;
      break;
    case 'Select':
      controlType = SelectControl;
      break;
    default:
      break;
  }

  return controlType;
};



import { memo } from "react";
const ItemControlBridge = (props: any) => {
    const { navigation, dataControlBridge, parentProps} = props;
    let Control = controlComponent(dataControlBridge.controlBridge);
    return (
      <Control
        key={dataControlBridge.index}
        controlBridge={dataControlBridge.controlBridge}
        navigation={navigation}
        children={
          <ControlContainer {...parentProps} path={dataControlBridge.controlBridge.Path} />
        }
      />
    );
};

const MemoItemControlBridge = memo(ItemControlBridge);
