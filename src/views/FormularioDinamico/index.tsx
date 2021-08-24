import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, Tab, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabItem } from './TabItemComponent';
import ControlContainer from './ControlContainer';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootMainStackParamList } from 'types/navigations';

import { connect } from 'react-redux';
import { RootState } from 'state/store/store';
import { saveDocumento } from 'state/formulariodinamico/actions';
import { SaveDocumento } from 'state/formulariodinamico/types';

import { ControlBridge } from 'utils/formulariodinamico/ControlBridge';
import { DocumentoFactory } from 'utils/formulariodinamico/DocumentoFactory';
import { OutputValueChangeCallBack, OutputValueChangedEvent } from 'types/documentofactory';

type State = {
  tabIndex: number,
  thisisonlyforforcerender: any
};

type DispatchProps = {
  saveDocumento: SaveDocumento;
}

type NavigationProps = {
  navigation: StackNavigationProp<RootMainStackParamList, 'FormularioDinamico'>;
  route: RouteProp<RootMainStackParamList, 'FormularioDinamico'>;
};

type Props = DispatchProps & NavigationProps;

class FormularioDinamico extends Component<Props, State> {
  private documentoFactory: DocumentoFactory;
  private handleOutputValueChange: OutputValueChangeCallBack = (event: OutputValueChangedEvent) => {
    this.props.saveDocumento(this.documentoFactory.Documento);
    this.setState({thisisonlyforforcerender: undefined});
  };

  state = {
    tabIndex: 0,
    thisisonlyforforcerender: undefined
  };

  constructor(props: Props) {
    super(props);

    const { documento } = props.route.params;

    this.documentoFactory = new DocumentoFactory(documento);
    this.documentoFactory.onOutputValueChange = this.handleOutputValueChange;
  }

  render() {
    const { ControlBridgeList, Documento } = this.documentoFactory;

    const getPagesBridge = (): ControlBridge[] => {
      return ControlBridgeList
        .filter(controlBridge => controlBridge.Control.type === 'Page')
        .sort((a, b) => a.Control.order - b.Control.order)
    };

    const TabItems = getPagesBridge().map((pageBridge, index) =>
      <TabItem key={index} title={pageBridge.property('title')}/>
    );

    return (
      <SafeAreaView style={styles.safeContainer}>
        <Header backgroundColor='#FDAE01' statusBarProps={{backgroundColor: '#FDAE01'}}
        centerContainerStyle={{flex: 10}} containerStyle={{borderBottomWidth: 0}}
        centerComponent={<Text style={styles.centerTitle}>{Documento.title}</Text>}/>

        <View style={{ overflow: 'hidden', paddingBottom: 3 }}>
          <View style={styles.tabsBar}>
            <Tab value={this.state.tabIndex} onChange={(tabIndex => this.setState({tabIndex}))}
              indicatorStyle={{borderBottomColor: 'white', borderBottomWidth: 2}}>
              {TabItems}
            </Tab>
          </View>
        </View>

        <ScrollView style={styles.controlsContent}>
          <ControlContainer
            controlBridges={ControlBridgeList}
            path={getPagesBridge()[this.state.tabIndex].Path}
            navigation={this.props.navigation}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  safeContainer: {
    flex: 1
  },
  tabsBar: {
    flex: 0,
    backgroundColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    elevation: 6
  },
  controlsContent: {
    flex: 1,
    paddingHorizontal: 10
  }
});

const mapDispatchToProps: DispatchProps = {
  saveDocumento
};

export default connect<{}, DispatchProps, {}, RootState>(null, mapDispatchToProps)(FormularioDinamico);
