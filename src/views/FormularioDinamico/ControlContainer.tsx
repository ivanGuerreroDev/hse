import React, {Component} from 'react';
import {View} from 'react-native';
import ControlComponent from './ControlComponent';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from 'types/navigations';

import {ControlBridge} from 'utils/formulariodinamico/ControlBridge';

import CheckControl from './Controls/CheckControl';
import LabelControl from './Controls/LabelControl';
import ListControl from './Controls/ListControl';
import RemarksControl from './Controls/RemarksControl';
import TextControl from './Controls/TextControl';

type MapControlBridgesProps = {
  controlBridges: ControlBridge[];
  path: string;
};

type NavigationProps = {
  navigation: StackNavigationProp<RootMainStackParamList, 'FormularioDinamico'>;
};

type Props = MapControlBridgesProps & NavigationProps;

export default class ControlContainer extends Component<Props> {
  render() {
    const {controlBridges, navigation, path} = this.props;

    const ControlComponents: JSX.Element[] = mapControlBridges(
      controlBridges,
      path,
    ).map((controlBridge, index) => {
      let Control = controlComponent(controlBridge);

      return (
        <Control
          key={index}
          controlBridge={controlBridge}
          navigation={navigation}
          children={
            <ControlContainer {...this.props} path={controlBridge.Path} />
          }
        />
      );
    });

    return <View>{ControlComponents}</View>;
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
    default:
      break;
  }

  return controlType;
};
