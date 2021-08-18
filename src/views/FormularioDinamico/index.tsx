import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, Tab, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootMainStackParamList } from 'types/navigations';
import { connect } from 'react-redux';
import { RootState } from 'state/store/store';
import { ControlBridgeTreeItem, DocumentoFactory } from 'utils/formulariodinamico/DocumentoFactory';
import { ControlContainer } from './ControlRenderer';

type Props = {
  route: RouteProp<RootMainStackParamList, 'FormularioDinamico'>;
}

class FormularioDinamico extends Component<Props> {
  private documentoFactory: DocumentoFactory;

  state = {
    tabIndex: 0
  };

  constructor(props: Props) {
    super(props);

    this.documentoFactory = new DocumentoFactory(props.route.params.documento);
  }

  render() {
    const tabItems = this.documentoFactory.ControlBridgeTree.map((bridge: ControlBridgeTreeItem) =>
      <Tab.Item key={`control:${bridge.controlBridge.Path}`} title={bridge.controlBridge.property('title')}/>
    );

    return (
      <SafeAreaView style={styles.safeContainer}>
        <Header backgroundColor='#FDAE01' statusBarProps={{backgroundColor: '#FDAE01'}}
          centerComponent={<Text>{this.documentoFactory.Documento.title}</Text>}
        />
        <View style={styles.tabsBar}>
          <Tab value={this.state.tabIndex} onChange={tabIndex => this.setState({tabIndex})}>
            {tabItems}
          </Tab>
        </View>
        <ScrollView style={styles.controlsContent}>
          <ControlContainer treeItems={this.documentoFactory.ControlBridgeTree[this.state.tabIndex].childrens}/>
        </ScrollView>
        <View style={styles.footerBar}>
          <Text>hola</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1
  },
  tabsBar: {
    flex: 0,
  },
  controlsContent: {
    flex: 1
  },
  footerBar: {
    backgroundColor: 'green',
    flex: 0
  }
});

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(mapStateToProps, null)(FormularioDinamico);
