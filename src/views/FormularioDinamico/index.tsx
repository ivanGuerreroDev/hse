import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, ToastAndroid, View, Platform, PermissionsAndroid, Linking, AppState} from 'react-native';
import {Button, Header, Icon, Tab, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabItem} from './TabItemComponent';
import ControlContainer from './ControlContainer';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootMainStackParamList} from 'types/navigations';

import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'state/store/store';
import {
  changeStatusDocumento,
  deleteDocumento,
  saveDocumento,
} from 'state/formulariodinamico/actions';
import {
  ChangeStatusDocumento,
  DeleteDocumento,
  SaveDocumento,
} from 'state/formulariodinamico/types';

import {formatRFC3339} from 'date-fns';
import {ControlBridge} from 'utils/formulariodinamico/ControlBridge';
import {DocumentoFactory} from 'utils/formulariodinamico/DocumentoFactory';
import {
  OutputValueChangeCallBack,
  OutputValueChangedEvent,
} from 'types/documentofactory';
import {DocumentoStatus, IDocumento} from 'utils/types/formulariodinamico';
import {createPendingTask} from 'utils/sendingManager';
import {isNetworkAllowed} from 'utils/network';

import Geolocation, { GeolocationError, GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation';
import { checkLocationPermission } from '../../utils/permissions';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { store } from 'state/store/store';
import { updateGeolocation } from 'state/settings/actions';
import DeviceInfo from 'react-native-device-info';
var LocationEnabler = (Platform.OS === 'android') ? require('react-native-location-enabler') : null

let addListener, checkSettings, requestResolutionSettings, configLocation;
if(Platform.OS === 'android'){
  const {
  PRIORITIES: { HIGH_ACCURACY }
  } = LocationEnabler
  addListener = LocationEnabler.addListener
  checkSettings = LocationEnabler.checkSettings
  requestResolutionSettings = LocationEnabler.requestResolutionSettings

  configLocation = {
    priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: false, // default false
  };
}


const packageId = DeviceInfo.getBundleId();

type State = {
  tabIndex: number;
  thisisonlyforforcerender: any;
  goConf: boolean;
  appState: any;
};

type DispatchProps = {
  changeStatusDocumento: ChangeStatusDocumento;
  deleteDocumento: DeleteDocumento;
  saveDocumento: SaveDocumento;
};

type NavigationProps = {
  navigation: StackNavigationProp<RootMainStackParamList, 'FormularioDinamico'>;
  route: RouteProp<RootMainStackParamList, 'FormularioDinamico'>;
};

type Props = DispatchProps & NavigationProps;

const options: GeolocationOptions = {
  timeout: 25 * 1000, //ms: seconds * 1000,
  maximumAge: 3 * 60000, //ms: minutes * 60000
  enableHighAccuracy: false,
};
class FormularioDinamico extends Component<Props, State> {
  private documentoFactory: DocumentoFactory;
  private handleOutputValueChange: OutputValueChangeCallBack = (
    event: OutputValueChangedEvent,
  ) => {
    this.documentoFactory.Documento.modifiedDate = {
      $date: formatRFC3339(new Date(), {fractionDigits: 3}),
    };
    this.props.saveDocumento(this.documentoFactory.Documento);
    this.setState({thisisonlyforforcerender: undefined});
  };

  state = {
    tabIndex: 0,
    thisisonlyforforcerender: undefined,
    goConf: false,
    appState: AppState.currentState,
    listener: Platform.OS === 'android' ? addListener(({ locationEnabled }) =>{
      console.log(`Location are ${ locationEnabled ? 'enabled' : 'disabled' }`);
      if(locationEnabled){
        this.checkLocation();
      }else{
        this.handleSend();
      }
    }) : null
  };

  constructor(props: Props) {
    super(props);
    console.log('@@ AppState ', AppState)
    AppState.addEventListener('change', this.handleAppStateChange)
    const {documento, readOnly} = props.route.params;

    this.documentoFactory = new DocumentoFactory(documento);
    this.documentoFactory.isReadOnly = readOnly || false;
    this.documentoFactory.onOutputValueChange = this.handleOutputValueChange;
  }


  handleAppStateChange = () => {
    if(this.state.goConf){
      this.isBackFromConfToSendForm();
    }
  }

  sendForm(Documento: any, navigation: any){
    changeStatusDocumento(
      Documento._id,
      DocumentoStatus.sending,
    );
    createPendingTask(Documento);
    this.setState({goConf:false})
    isNetworkAllowed()
      ? ToastAndroid.show(
          'El documento se ha enviado con exito',
          ToastAndroid.SHORT,
        )
      : ToastAndroid.show(
          'El documento se ha guardado con exito',
          ToastAndroid.SHORT,
        );
    navigation.goBack();
  }

  positionCallback = (position: GeolocationResponse) => {
    const {Documento} = this.documentoFactory;
    store.dispatch(updateGeolocation(position));
    Documento.geolocation = position;
    this.handleSend();

  };

  handleSend () {
    const {Documento} = this.documentoFactory;
    const {navigation} = this.props;
    console.log("Location: ")
    console.log(Documento.geolocation)
    this.sendForm(Documento, navigation)
  }

  errorCallback = (error: GeolocationError) => {
    console.warn(error.message);
    console.log(error.POSITION_UNAVAILABLE)
    if(error.POSITION_UNAVAILABLE === 2){
      if (Platform.OS !== 'ios') {
        console.log("requestResolutionSettings")
        requestResolutionSettings(configLocation);
      }
    }
  };

  isBackFromConfToSendForm () {
    checkLocationPermission()
      .then(result => {
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          Geolocation.getCurrentPosition(this.positionCallback, this.errorCallback, options);
        }
      })
  }

  checkLocation () {
    checkLocationPermission()
      .then(result => {
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          Geolocation.getCurrentPosition(this.positionCallback, this.errorCallback, options);
        }else{
          if (Platform.OS === 'ios') {
            Alert.alert(
              'Geolocalicación está desactivada',
              '¿Desea proceder a la activación de la geolocalización?',
              [
                {
                  text: 'Cancelar',
                  onPress: () => {
                    this.handleSend();
                  },
                },
                {
                  text: 'Aceptar',
                  onPress: async () => {
                    this.setState({
                      goConf: true
                    })
                    Linking.openURL('App-Prefs:Privacy&path=LOCATION')
                  }
                }
              ]
            )
          }else{
            this.handleSend();
          }
        }
      })
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    if(Platform.OS === 'android') this.state?.listener?.remove()
  }

  render() {
    const {ControlBridgeList, Documento} = this.documentoFactory;
    const {changeStatusDocumento, deleteDocumento, navigation} = this.props;

    const getPagesBridge = (): ControlBridge[] => {
      return ControlBridgeList.filter(
        controlBridge => controlBridge.Control.type === 'Page',
      ).sort((a, b) => a.Control.order - b.Control.order);
    };

    const TabItems = getPagesBridge().map((pageBridge, index) => (
      <TabItem key={index} title={pageBridge.property('title')} />
    ));

    let FooterButtons: JSX.Element[] = [];
    if (
      Documento.modifiedDate !== Documento.creationDate &&
      Documento.status !== DocumentoStatus.sending
    )
      FooterButtons.push(
        <Button
          title="Eliminar"
          iconPosition="top"
          titleStyle={{fontSize: 12}}
          buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type="material" name="delete" color="white" />}
          onPress={() => {
            deleteDocumento(Documento._id);
            navigation.goBack();
          }}
        />,
      );
    if (Documento.status === DocumentoStatus.sending)
      FooterButtons.push(
        <Button
          title="Cancelar Envío"
          iconPosition="top"
          titleStyle={{fontSize: 12}}
          buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type="material" name="cancel" color="white" />}
          onPress={() => {
            // changeStatusDocumento(Documento._id, DocumentoStatus.draft);
            console.warn('Función no implementada');
            navigation.goBack();
          }}
        />,
      );
    if (Documento.status === DocumentoStatus.draft)
      FooterButtons.push(
        <Button
          title="Enviar"
          iconPosition="top"
          titleStyle={{fontSize: 12}}
          buttonStyle={{backgroundColor: '#FDAE01'}}
          icon={<Icon type="material" name="send" color="white" />}
          onPress={() => {
            let messages = this.documentoFactory.validateOutputValues();
            if (messages.length > 0) {
              Alert.alert(
                'Falta completar los siguientes campos...',
                `${messages.map(x => x)}`,
                [
                  {
                    text: 'Aceptar',
                    onPress: () => {},
                  },
                ],
                {cancelable: true},
              );
            } else {
              Alert.alert(
                'Confirmación',
                isNetworkAllowed()
                  ? 'Esta seguro de enviar el formulario'
                  : 'Esta seguro de guardar el formulario',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => {},
                  },
                  {
                    text: 'Aceptar',
                    onPress: () => this.checkLocation()
                  }
                ]
              )
            }
          }}
        />,
      );

    return (
      <SafeAreaView style={styles.safeContainer}>
        <Header
          backgroundColor="#FDAE01"
          statusBarProps={{backgroundColor: '#FDAE01'}}
          centerContainerStyle={{flex: 10}}
          containerStyle={{
            borderBottomWidth: 0,
          }}
          centerComponent={
            <View style={styles.containerHeader}>
              <Text style={styles.centerTitle}>{Documento.title}</Text>
            </View>
          }
        />

        <View style={{overflow: 'hidden', paddingBottom: '4%'}}>
          <View style={styles.tabsBar}>
            <Tab
              value={this.state.tabIndex}
              onChange={tabIndex => this.setState({tabIndex})}
              indicatorStyle={{
                borderBottomColor: 'white',
                borderBottomWidth: 2,
              }}>
              {TabItems}
            </Tab>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.controlsContent}>
          <ControlContainer
            controlBridges={ControlBridgeList}
            path={getPagesBridge()[this.state.tabIndex].Path}
            navigation={this.props.navigation}
          />
        </ScrollView>

        <View style={styles.footerBar}>
          {FooterButtons.map((button, index) => (
            <View key={index} style={styles.footerButtonContainer}>
              {button}
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
): DispatchProps => {
  return {
    changeStatusDocumento: (id: string, status: DocumentoStatus) =>
      dispatch(changeStatusDocumento(id, status)),
    deleteDocumento: (id: string) => dispatch(deleteDocumento(id)),
    saveDocumento: (documento: IDocumento) =>
      dispatch(saveDocumento(documento)),
  };
};

export default connect<{}, DispatchProps, {}, RootState>(
  null,
  mapDispatchToProps,
)(FormularioDinamico);

const styles = StyleSheet.create({
  centerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerHeader: {
    justifyContent: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsBar: {
    flex: 0,
    backgroundColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    elevation: 6,
  },
  controlsContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  footerBar: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 2,
    backgroundColor: '#FDAE01',
  },
  footerButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
