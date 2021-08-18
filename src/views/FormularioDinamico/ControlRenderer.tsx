import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ControlBridge } from 'utils/formulariodinamico/ControlBridge';
import { ControlBridgeTreeItem } from 'utils/formulariodinamico/DocumentoFactory';

type ContainerProps = {
  treeItems: ControlBridgeTreeItem[]
};

export class ControlContainer extends Component<ContainerProps> {
  render() {
    const childrenBridges = this.props.treeItems.map(treeItem =>
      <Control key={`control:${treeItem.controlBridge.Path}`}
        controlBridge={treeItem.controlBridge}
        subControls={treeItem.childrens}/>
    );
    return (
      <View>
        {childrenBridges}
      </View>
    );
  }
}

type ControlProps = {
  controlBridge: ControlBridge,
  subControls: ControlBridgeTreeItem[]
};

export class Control extends Component<ControlProps> {
  render() {
    return (
      <View style={controlStyles.controlBorder}>
        {this.props.controlBridge.RenderUI}
        <ControlContainer treeItems={this.props.subControls}/>
      </View>
    );
  }

}

const controlStyles = StyleSheet.create({
  controlBorder: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5
  }
});
