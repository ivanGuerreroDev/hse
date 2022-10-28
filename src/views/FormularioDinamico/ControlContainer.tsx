import React, {Component} from 'react';
import {FlatList} from 'react-native';
import ControlComponent from './ControlComponent';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from 'types/navigations';

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

  renderItem = ({item}) => {
    const {navigation} = this.props;
    let Control = controlComponent(item.controlBridge);
    return (
      <Control
        key={item.index}
        controlBridge={item.controlBridge}
        navigation={navigation}
        children={
          <ControlContainer {...this.props} path={item.controlBridge.Path} />
        }
      />
    );
  };

  render() {
    const {controlBridges, path} = this.props;
    return (
      <FlatList
        data={mapControlBridges(
          controlBridges,
          path,
        ).map((controlBridge, index)=>({controlBridge, index}))}
        renderItem={this.renderItem}
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
    .filter(controlBridge =>
      new RegExp(`^${path}.[0-9]+$`).test(controlBridge.Path),
    )
    .sort((a, b) => a.Control.order - b.Control.order);
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
