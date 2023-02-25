import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    View,
    Platform,
    PermissionsAndroid,
    Linking,
    AppState,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { Button, Header, Icon, Tab, Text, LinearProgress } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabItem } from './TabItemComponent';
import ControlContainer from './ControlContainer';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootMainStackParamList } from 'types/navigations';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'state/store/store';
import {
    changeStatusDocumento,
    deleteDocumento,
    saveDocumento
} from 'state/formulariodinamico/actions';
import {
    ChangeStatusDocumento,
    DeleteDocumento,
    SaveDocumento
} from 'state/formulariodinamico/types';

import { formatRFC3339 } from 'date-fns';
import { ControlBridge } from 'utils/formulariodinamico/ControlBridge';
import { DocumentoFactory } from 'utils/formulariodinamico/DocumentoFactory';
import {
    OutputValueChangeCallBack,
    OutputValueChangedEvent
} from 'types/documentofactory';
import { DocumentoStatus, IDocumento } from 'utils/types/formulariodinamico';
import { createPendingTask } from 'utils/sendingManager';
import { isNetworkAllowed } from 'utils/network';

import Geolocation, {
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse
} from '@react-native-community/geolocation';
import { checkLocationPermission } from '../../utils/permissions';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { store } from 'state/store/store';
import { updateGeolocation } from 'state/settings/actions';
var addListener: any,
    checkSettings,
    requestResolutionSettings: any,
    configLocation: any;
if (Platform?.OS === 'android') {
    const LocationEnabler = require('react-native-location-enabler');
    const {
        PRIORITIES: { HIGH_ACCURACY }
    } = LocationEnabler?.default;
    addListener = LocationEnabler?.default?.addListener;
    checkSettings = LocationEnabler?.default?.checkSettings;
    requestResolutionSettings =
        LocationEnabler?.default?.requestResolutionSettings;

    configLocation = {
        priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
        alwaysShow: true, // default false
        needBle: false // default false
    };
}

type State = {
    tabIndex: number;
    thisisonlyforforcerender: any;
    goConf: boolean;
    appState: any;
    app: String;
    loading: boolean;
};

type DispatchProps = {
    changeStatusDocumento: ChangeStatusDocumento;
    deleteDocumento: DeleteDocumento;
    saveDocumento: SaveDocumento;
};

type NavigationProps = {
    navigation: StackNavigationProp<
        RootMainStackParamList,
        'FormularioDinamico'
    >;
    route: RouteProp<RootMainStackParamList, 'FormularioDinamico'>;
};

type Props = DispatchProps & NavigationProps & {
    app: String
};

const options: GeolocationOptions = {
    timeout: 25 * 1000, //ms: seconds * 1000,
    maximumAge: 3 * 60000, //ms: minutes * 60000
    enableHighAccuracy: true
};
Geolocation.setRNConfiguration({
    skipPermissionRequest: false,
    authorizationLevel: 'whenInUse'
});
class FormularioDinamico extends Component<Props, State> {
    private documentoFactory: DocumentoFactory;
    private handleOutputValueChange: OutputValueChangeCallBack = (
        event: OutputValueChangedEvent
    ) => {
        this.documentoFactory.Documento.modifiedDate = {
            $date: formatRFC3339(new Date(), { fractionDigits: 3 })
        };
        this.props.saveDocumento(this.documentoFactory.Documento);
        this.setState({ thisisonlyforforcerender: undefined });
    };
    private changeEventListener: any;

    state = {
        tabIndex: 0,
        thisisonlyforforcerender: undefined,
        goConf: false,
        appState: AppState.currentState,
        app: this.props.route.params.app,
        loading: false,
        listener:
            Platform.OS === 'android'
                ? addListener(({ locationEnabled }) => {
                    if (locationEnabled) {
                        this.checkLocation();
                    } else {
                        this.handleSend();
                    }
                })
                : null
    };

    constructor(props: Props) {
        super(props);
        this.changeEventListener = null;
        const { documento, readOnly } = props.route.params;
        this.documentoFactory = new DocumentoFactory(documento);
        this.documentoFactory.isReadOnly = readOnly || false;
        this.documentoFactory.onOutputValueChange =
            this.handleOutputValueChange;
    }

    handleAppStateChange = () => {
        if (this.state.goConf) {
            this.isBackFromConfToSendForm();
        }
    };

    sendForm(Documento: any, navigation: any) {
        changeStatusDocumento(Documento._id, DocumentoStatus.sending);
        createPendingTask(Documento);
        isNetworkAllowed() ? this.successAlert(false) : this.successAlert(true);
        this.setState({ goConf: false, loading: false });
        navigation.goBack();
    }

    successAlert(save) {
        if (save) {
            if (Platform.OS === 'ios') {
                Alert.alert('El documento se ha guardado con exito');
            } else {
                ToastAndroid.show(
                    'El documento se ha guardado con exito',
                    ToastAndroid.SHORT
                );
            }
        } else {
            if (Platform.OS === 'ios') {
                Alert.alert('El documento se ha enviado con exito');
            } else {
                ToastAndroid.show(
                    'El documento se ha enviado con exito',
                    ToastAndroid.SHORT
                );
            }
        }
    }

    positionCallback = (position: GeolocationResponse) => {
        const { Documento } = this.documentoFactory;
        store.dispatch(updateGeolocation(position));
        Documento.geolocation = position;
        this.handleSend();
    };

    handleSend() {
        const { Documento } = this.documentoFactory;
        const { navigation } = this.props;
        this.sendForm(Documento, navigation);
    }

    errorCallback = (error: GeolocationError) => {
        console.error('@@ error callback');
        console.error(error.message);
        console.error(error.PERMISSION_DENIED);
        console.error(error.POSITION_UNAVAILABLE);
        this.setState({ loading: false });
        if (error.POSITION_UNAVAILABLE === 2) {
            if (Platform.OS !== 'ios') {
                requestResolutionSettings(configLocation);
            }
        }
    };

    isBackFromConfToSendForm() {
        checkLocationPermission()
            .then((result) => {
                if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
                    Geolocation.getCurrentPosition(
                        this.positionCallback,
                        this.errorCallback,
                        options
                    );
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                console.error(error)
            });
    }

    checkLocation() {
        this.setState({ loading: true });
        checkLocationPermission()
            .then((result) => {
                if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
                    Geolocation.getCurrentPosition(
                        this.positionCallback,
                        this.errorCallback,
                        options
                    );
                } else {
                    if (Platform.OS === 'ios') {
                        Alert.alert(
                            'Geolocalicación está desactivada',
                            '¿Desea proceder a la activación de la geolocalización?',
                            [
                                {
                                    text: 'Cancelar',
                                    onPress: () => {
                                        this.handleSend();
                                    }
                                },
                                {
                                    text: 'Aceptar',
                                    onPress: async () => {
                                        this.setState({
                                            goConf: true,
                                            loading: false
                                        });
                                        Linking.openURL(
                                            'App-Prefs:Privacy&path=LOCATION'
                                        );
                                    }
                                }
                            ]
                        );
                    } else {
                        this.handleSend();
                    }
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({ loading: false });
            });
    }

    componentDidMount(): void {
        this.changeEventListener = AppState.addEventListener(
            'change',
            this.handleAppStateChange
        );
    }
    componentWillUnmount() {
        this.changeEventListener.remove();
        if (Platform.OS === 'android') this.state?.listener?.remove();
    }

    render() {
        const { ControlBridgeList, Documento } = this.documentoFactory;
        const { changeStatusDocumento, deleteDocumento, navigation } =
            this.props;

        const getPagesBridge = (): ControlBridge[] => {
            return ControlBridgeList.filter(
                (controlBridge) => controlBridge.Control.type === 'Page'
            ).sort((a, b) => a.Control.order - b.Control.order);
        };

        const TabItems = getPagesBridge().map((pageBridge, index) => (
            <TabItem key={index} title={pageBridge.property('title')} app={this.state.app} />
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
                    titleStyle={{ fontSize: 12 }}
                    disabled={this.state.loading}
                    buttonStyle={{ backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb' }}
                    disabledStyle={{ backgroundColor: 'transparent' }}
                    icon={<Icon type="material" name="delete" color="white" />}
                    onPress={() => {
                        deleteDocumento(Documento._id);
                        navigation.goBack();
                    }}
                />
            );
        if (Documento.status === DocumentoStatus.sending)
            FooterButtons.push(
                <Button
                    title="Cancelar Envío"
                    iconPosition="top"
                    titleStyle={{ fontSize: 12 }}
                    buttonStyle={{ backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb' }}
                    disabledStyle={{ backgroundColor: 'transparent' }}
                    icon={<Icon type="material" name="cancel" color="white" />}
                    onPress={() => {
                        // changeStatusDocumento(Documento._id, DocumentoStatus.draft);
                        console.error('Función no implementada');
                        navigation.goBack();
                    }}
                />
            );
        if (Documento.status === DocumentoStatus.draft)
            FooterButtons.push(
                <Button
                    title="Enviar"
                    iconPosition="top"
                    disabled={this.state.loading}
                    titleStyle={{ fontSize: 12 }}
                    buttonStyle={{ backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb' }}
                    disabledStyle={{ backgroundColor: 'transparent' }}
                    icon={<Icon type="material" name="send" color="white" />}
                    onPress={() => {
                        let messages =
                            this.documentoFactory.validateOutputValues();
                        if (messages.length > 0) {
                            Alert.alert(
                                'Falta completar los siguientes campos...',
                                `${messages.map((x) => x)}`,
                                [
                                    {
                                        text: 'Aceptar',
                                        onPress: () => { }
                                    }
                                ],
                                { cancelable: true }
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
                                        onPress: () => { }
                                    },
                                    {
                                        text: 'Aceptar',
                                        onPress: () => this.checkLocation()
                                    }
                                ]
                            );
                        }
                    }}
                />
            );
        return (
            <>
                <Header
                    containerStyle={{
                        ...styles.header,
                        backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb'
                    }}
                    leftComponent={
                        <View style={styles.containerHeader}>
                            <TouchableOpacity
                                style={styles.headergoBack}
                                onPress={() => {
                                    deleteDocumento(Documento._id);
                                    navigation.goBack();
                                }}
                            >
                                <Icon
                                    name="arrow-left"
                                    type="fontisto"
                                    color="#FFFFFF"
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={
                        <View style={styles.containerTitle}>
                            <Text style={styles.centerTitle}>
                                {Documento.title}
                            </Text>
                        </View>
                    }
                    rightComponent={{}}
                    statusBarProps={{ barStyle: 'light-content' }}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : ''}
                    style={{ flex: 1, paddingTop: 0 }}
                    enabled
                >
                    <View style={{ overflow: 'hidden', paddingBottom: '4%', backgroundColor: '#fff' }}>
                        <View style={styles.tabsBar}>
                            <Tab
                                value={this.state.tabIndex}
                                onChange={(tabIndex) =>
                                    this.setState({ tabIndex })
                                }
                                indicatorStyle={{
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 2
                                }}
                            >
                                {TabItems}
                            </Tab>
                        </View>
                    </View>

                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        style={styles.controlsContent}
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref={(ref) => (this.formScroll = ref)}
                    >
                        <ControlContainer
                            controlBridges={ControlBridgeList}
                            path={getPagesBridge()[this.state.tabIndex].Path}
                            navigation={this.props.navigation}
                            scrollRef={this.formScroll}
                            app={this.state.app}
                        />
                    </ScrollView>
                    {
                        this.state.loading && (
                            <LinearProgress color="primary" />
                        )
                    }
                    <View style={{
                        ...styles.footerBar,
                        backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb'
                    }}>
                        {FooterButtons.map((button, index) => (
                            <View
                                key={index}
                                style={{
                                    ...styles.footerButtonContainer,
                                    backgroundColor: this.state.app === 'HSE' ? '#FDAE01' : this.state.app === 'Producción' ? '#55b25f' : '#cbcbcb'
                                }}
                            >
                                {button}
                            </View>
                        ))}
                    </View>
                </KeyboardAvoidingView>
            </>
        );
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
    return {
        changeStatusDocumento: (id: string, status: DocumentoStatus) =>
            dispatch(changeStatusDocumento(id, status)),
        deleteDocumento: (id: string) => dispatch(deleteDocumento(id)),
        saveDocumento: (documento: IDocumento) =>
            dispatch(saveDocumento(documento))
    };
};

export default connect<{}, DispatchProps, {}, RootState>(
    null,
    mapDispatchToProps
)(FormularioDinamico);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        justifyContent: 'space-around',
        opacity: 1
    },
    containerTitle: {
        flexDirection: 'row'
    },
    centerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flexShrink: 1,
        flex: 1
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '400%'
    },
    headergoBack: {
        marginTop: 5,
        marginLeft: '5%',
        marginRight: '10%'
    },
    safeContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    tabsBar: {
        flex: 0,
        backgroundColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        elevation: 6
    },
    controlsContent: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    footerBar: {
        flex: 0,
        flexDirection: 'row',
        marginTop: 2,
    },
    footerButtonContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 15
    }
});
