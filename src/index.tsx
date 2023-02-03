import React, { Component } from 'react';
import {Platform, Alert, ToastAndroid} from 'react-native'
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    RootAuthStackParamList,
    RootMainStackParamList
} from 'utils/types/navigations';
import { refreshToken } from 'utils/cognito/cognito-wrapper';
import { isNetworkAllowed, isNetworkMounted } from 'utils/network';

// Redux
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'state/store/store';
// User
import { forgiveUser, saveUser } from 'state/user/actions';
import { ForgiveUser, IUser, SaveUser } from 'state/user/types';
// Formulario
import { saveFormulariosAsync } from 'state/formulariodinamico/thunk';
import { SaveFormularioAsync } from 'state/formulariodinamico/types';
// Perfill
import { savePerfilesAsync } from 'state/perfil/thunk';
import { SavePerfilAsync } from 'state/perfil/types';
// Menu
import { saveMenusAsyncThunk } from 'state/menu/thunk';
import { SaveMenuAsync } from 'state/menu/types';
// Capacitacion
import { saveCapacitacionAsyncThunk } from 'state/capacitacion/thunk';
import { SaveCapacitacionAsync } from 'state/capacitacion/types';
// Observaciones
import { saveObservacionAsyncThunk } from 'state/observacion/thunk';
import { SaveObservacionAsync } from 'state/observacion/types';
// Inspecciones
import { saveInspeccionAsyncThunk } from 'state/inspeccion/thunk';
import { SaveInspeccionAsync } from 'state/inspeccion/types';

// Combustibles
import { saveCombustiblesAsyncThunk } from 'state/combustibles/thunk';
import { SaveCombustiblesAsync } from 'state/combustibles/types';

import Lottie from 'components/Lottie';

import Auth from 'views/Auth';
import SwitchApp from 'views/MainFrame/SwitchApp';
import MainFrame from 'views/MainFrame';
import Produccion from 'views/MainFrame/Produccion';
import FormularioDinamico from 'views/FormularioDinamico';
import Modal from 'components/Modal';
import Capacitaciones from 'views/Capacitaciones';
import Relator from 'views/Capacitaciones/Relator';
import List from 'views/Capacitaciones/List';

import 'react-native-gesture-handler';

const AuthStack = createStackNavigator<RootAuthStackParamList>();
const MainStack = createStackNavigator<RootMainStackParamList>();

type StateProps = {
    currentUser: IUser | undefined;
    rememberUser: IUser | undefined;
};

type DispatchProps = {
    forgiveUser: ForgiveUser;
    saveUser: SaveUser;
    saveFormulariosAsync: SaveFormularioAsync;
    savePerfilesAsync: SavePerfilAsync;
    saveMenusAsyncThunk: SaveMenuAsync;
    saveCapacitacionAsyncThunk: SaveCapacitacionAsync;
    saveObservacionAsyncThunk: SaveObservacionAsync;
    saveInspeccionAsyncThunk: SaveInspeccionAsync;
    saveCombustiblesAsyncThunk: SaveCombustiblesAsync;
};

type Props = StateProps & DispatchProps;

class Index extends Component<Props> {
    state = {
        isLoading: true,
        isValidate: true
    };

    componentDidMount() {
        const { props } = this;

        new Promise(async () => {
            while (!isNetworkMounted()) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            this.setState({isLoading: true})
            if (isNetworkAllowed()) {
                if (
                    props.rememberUser &&
                    props.rememberUser.UserTokens.RefreshToken
                ) {
                    refreshToken(
                        props.rememberUser.UserTokens.RefreshToken,
                        props.rememberUser.Empresa
                    )
                        .then((result) => {
                            if (props.rememberUser) {
                                let user: IUser = {
                                    ...props.rememberUser,
                                    UserTokens: {
                                        ...props.rememberUser.UserTokens,
                                        AccessToken:
                                            result.AuthenticationResult
                                                ?.AccessToken,
                                        IdToken:
                                            result.AuthenticationResult?.IdToken
                                    }
                                };
                                axios.defaults.headers.common[
                                    'Authorization'
                                ] = `Bearer ${user.UserTokens.AccessToken}`;
                                props.saveUser(user, true);
                                props.savePerfilesAsync(props.rememberUser);
                                props.saveMenusAsyncThunk(props.rememberUser);
                                props.saveCapacitacionAsyncThunk(
                                    props.rememberUser
                                );
                                props.saveObservacionAsyncThunk(
                                    props.rememberUser
                                );
                                props.saveInspeccionAsyncThunk(
                                    props.rememberUser
                                );
                                props.saveCombustiblesAsyncThunk(
                                    props.rememberUser
                                );
                                props.saveFormulariosAsync(props.rememberUser);
                            } else {
                                props.forgiveUser();
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            props.forgiveUser();
                        })
                        .finally(() => {
                            this.setState({
                                isValidate: false,
                                isLoading: false
                            });
                        });
                } else {
                    this.setState({ isValidate: false, isLoading:false });
                }
            } else {
                if (props.rememberUser) {
                    props.saveUser(props.rememberUser, true);
                } else {
                    props.forgiveUser();
                }
                this.setState({ isValidate: false, isLoading:false });
            }
        }).finally(() => { });
    }

    render() {
        const AuthNavigator = (
            <AuthStack.Navigator headerMode="none">
                <AuthStack.Screen name="Auth" component={Auth} />
            </AuthStack.Navigator>
        );

        const AppNavigator = (
            <MainStack.Navigator
                headerMode="none"
                mode="card"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: false,
                    animationEnabled: false
                    /*cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),*/
                }}
            >
                <MainStack.Screen name="SwitchApp" component={SwitchApp} />
                <MainStack.Screen name="MainFrame" component={MainFrame}/>
                <MainStack.Screen name="Produccion" component={Produccion}/>
                <MainStack.Screen
                    name="FormularioDinamico"
                    component={FormularioDinamico}
                />
                <MainStack.Screen name="Modal" component={Modal} />
                <MainStack.Screen
                    name="Capacitaciones"
                    component={Capacitaciones}
                />
                <MainStack.Screen name="Relator" component={Relator} />
                <MainStack.Screen name="List" component={List} />
            </MainStack.Navigator>
        );

        const Navigator = this.props.currentUser ? AppNavigator : AuthNavigator;

        if (this.state.isLoading || this.state.isValidate) {
            return (
                <Lottie
                    onAnimationFinish={() =>
                        this.setState({ isLoading: false })
                    }
                />
            );
        } else return <NavigationContainer>{Navigator}</NavigationContainer>;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        currentUser: state.currentUser.user,
        rememberUser: state.user.rememberUser
    };
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
    return {
        forgiveUser: () => dispatch(forgiveUser()),
        saveUser: (user: IUser, remember: boolean) =>
            dispatch(saveUser(user, remember)),
        saveFormulariosAsync: (user: IUser) =>
            dispatch(saveFormulariosAsync(user)),
        savePerfilesAsync: (user: IUser) => dispatch(savePerfilesAsync(user)),
        saveMenusAsyncThunk: (user: IUser) =>
            dispatch(saveMenusAsyncThunk(user)),
        saveCapacitacionAsyncThunk: (user: IUser) =>
            dispatch(saveCapacitacionAsyncThunk(user)),
        saveObservacionAsyncThunk: (user: IUser) =>
            dispatch(saveObservacionAsyncThunk(user)),
        saveInspeccionAsyncThunk: (user: IUser) =>
            dispatch(saveInspeccionAsyncThunk(user)),
        saveCombustiblesAsyncThunk: (user: IUser) =>
            dispatch(saveCombustiblesAsyncThunk(user))
    };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Index);
