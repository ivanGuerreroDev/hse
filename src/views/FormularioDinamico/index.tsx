import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Header, Icon, Tab, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabItem } from './TabItemComponent';
import ControlContainer from './ControlContainer';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootMainStackParamList } from 'types/navigations';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'state/store/store';
import { changeStatusDocumento, deleteDocumento, saveDocumento } from 'state/formulariodinamico/actions';
import { ChangeStatusDocumento, DeleteDocumento, SaveDocumento } from 'state/formulariodinamico/types';

import { formatRFC3339 } from 'date-fns';
import { ControlBridge } from 'utils/formulariodinamico/ControlBridge';
import { DocumentoFactory } from 'utils/formulariodinamico/DocumentoFactory';
import { OutputValueChangeCallBack, OutputValueChangedEvent } from 'types/documentofactory';
import { DocumentoStatus, IDocumento } from 'utils/types/formulariodinamico';

type State = {
  tabIndex: number,
  thisisonlyforforcerender: any
};

type DispatchProps = {
  changeStatusDocumento: ChangeStatusDocumento;
  deleteDocumento: DeleteDocumento;
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
    this.documentoFactory.Documento.modifiedDate = {
      $date: formatRFC3339(new Date(), {fractionDigits: 3})
    };
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
    const { changeStatusDocumento, deleteDocumento, navigation } = this.props;

    const getPagesBridge = (): ControlBridge[] => {
      return ControlBridgeList
        .filter(controlBridge => controlBridge.Control.type === 'Page')
        .sort((a, b) => a.Control.order - b.Control.order)
    };

    const TabItems = getPagesBridge().map((pageBridge, index) =>
      <TabItem key={index} title={pageBridge.property('title')}/>
    );

    let FooterButtons: JSX.Element[] = [];
    if (Documento.modifiedDate !== Documento.creationDate && Documento.status !== DocumentoStatus.sending)
      FooterButtons.push(
        <Button title='Eliminar' iconPosition='top'
          titleStyle={{fontSize: 12}} buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type='material' name='delete' color='white'/>}
          onPress={() => {
            deleteDocumento(Documento._id);
            navigation.goBack();
          }}/>
      );
    if (Documento.status === DocumentoStatus.sending)
      FooterButtons.push(
        <Button title='Cancelar Envío' iconPosition='top'
          titleStyle={{fontSize: 12}} buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type='material' name='cancel' color='white'/>}
          onPress={() => {
            changeStatusDocumento(Documento._id, DocumentoStatus.draft);
            navigation.goBack();
          }}/>
      );
    if (Documento.status === DocumentoStatus.draft)
      FooterButtons.push(
        <Button title='Enviar' iconPosition='top'
          titleStyle={{fontSize: 12}} buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type='material' name='send' color='white'/>}
          onPress={() => {
            changeStatusDocumento(Documento._id, DocumentoStatus.sending);
            navigation.goBack();
          }}/>
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

        <View style={styles.footerBar}>
          {FooterButtons.map((button, index) =>
            <View key={index} style={styles.footerButtonContainer}>
              {button}
            </View>
          )}
        </View>
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
  },
  footerBar: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 2,
    backgroundColor: '#FDAE01',

  },
  footerButtonContainer: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    changeStatusDocumento: (id: string, status: DocumentoStatus) => dispatch(changeStatusDocumento(id, status)),
    deleteDocumento: (id: string) => dispatch(deleteDocumento(id)),
    saveDocumento: (documento: IDocumento) => dispatch(saveDocumento(documento))
  };
};

export default connect<{}, DispatchProps, {}, RootState>(null, mapDispatchToProps)(FormularioDinamico);
