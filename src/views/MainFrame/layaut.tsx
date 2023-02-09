import { FadeInImage } from 'components/FadeImage/FadeInImage';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    ToastAndroid,
    Alert
} from 'react-native';
import { Header, Icon, Button, LinearProgress } from 'react-native-elements';
import axios from 'axios';
import { refreshToken } from 'utils/cognito/cognito-wrapper';
// Redux
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'state/store/store';
// User
import { forgiveUser, saveUser } from 'state/user/actions';
import { IUser } from 'state/user/types';
// Formulario
import { saveFormulariosAsync } from 'state/formulariodinamico/thunk';
// Perfill
import { savePerfilesAsync } from 'state/perfil/thunk';
// Menu
import { saveMenusAsyncThunk } from 'state/menu/thunk';
// Capacitacion
import { saveCapacitacionAsyncThunk } from 'state/capacitacion/thunk';
// Observaciones
import { saveObservacionAsyncThunk } from 'state/observacion/thunk';
// Inspecciones
import { saveInspeccionAsyncThunk } from 'state/inspeccion/thunk';
// Inspecciones
import { saveCombustiblesAsyncThunk } from 'state/combustibles/thunk';

import { isNetworkAllowed } from 'utils/network';

type customProps = {
    children: any;
    app: String;
}
type StateProps = {
    currentUser: IUser | undefined;
};
type DispatchProps = {
    forgiveUser: any;
    saveUser: any;
    saveFormulariosAsync: any;
    savePerfilesAsync: any;
    saveMenusAsyncThunk: any;
    saveCapacitacionAsyncThunk: any;
    saveObservacionAsyncThunk: any;
    saveInspeccionAsyncThunk: any;
    saveCombustiblesAsyncThunk: any;
};
type Props = StateProps & DispatchProps & customProps;

class Layout extends Component<Props> {
    state = {
        isLoading: false,
        logo: this.props.app === 'HSE' ? require('components/Assets/logo_hse_blanco.png') : this.props.app === 'Producción' ? require('components/Assets/logo_produccion.png') : ''
    };
    constructor(props: Props) {
        super(props);
        this.refreshUserData = this.refreshUserData.bind(this);
    }

    refreshUserData() {
        const { props } = this;
        if(isNetworkAllowed()){
            this.setState({
                isLoading: true
            });
            if (
                props?.currentUser &&
                props?.currentUser?.UserTokens?.RefreshToken
            ) {
                refreshToken(
                    props.currentUser.UserTokens.RefreshToken,
                    props.currentUser.Empresa
                )
                    .then((result) => {
                        if (props.currentUser) {
                            let user: IUser = {
                                ...props.currentUser,
                                UserTokens: {
                                    ...props.currentUser.UserTokens,
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
                            props.saveCapacitacionAsyncThunk(
                                props.currentUser
                            );
                            props.saveObservacionAsyncThunk(
                                props.currentUser
                            );
                            props.saveInspeccionAsyncThunk(
                                props.currentUser
                            );
                            props.saveCombustiblesAsyncThunk(
                                props.currentUser
                            );
                            props.saveFormulariosAsync(props.currentUser);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        if (Platform.OS === 'ios') {
                            Alert.alert('No se pudo actualizar');
                        } else {
                            ToastAndroid.show(
                                'No se pudo actualizar',
                                ToastAndroid.SHORT
                            );
                        }
                    }).finally(()=>{
                        this.setState({
                            isLoading: false
                        });
                    })
            }else{
                this.setState({
                    isLoading: false
                });
            }
        }else{
            const errorMsg = 'No ha sido posible conectarse a internet...'
            if (Platform.OS === 'ios') {  Alert.alert(errorMsg);} 
            else { ToastAndroid.show( errorMsg, ToastAndroid.SHORT);}
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        ...styles.header,
                        backgroundColor: this.props.app === 'HSE' ? '#FDAE01' : this.props.app === 'Producción' ? '#55b25f' : '#cbcbcb',
                    }}
                    leftComponent={{}}
                    centerComponent={
                        <View style={styles.containerHeader}>
                            <FadeInImage
                                uri={this.state.logo}
                                image={{ ...styles.headerLogo, height: this.props.app === 'HSE' ? 26 : this.props.app === 'Producción' ? 26 : 26, }}

                            />
                        </View>
                    }
                    rightComponent={
                        <Button
                            buttonStyle={{backgroundColor: 'transparent', alignSelf: 'center'}}
                            icon={
                                <Icon type="metarial" name="refresh" color={'#fff'} />}
                            onPress={this.refreshUserData}
                        />
                    }
                    statusBarProps={{ barStyle: 'light-content' }}
                />
                {
                    this.state.isLoading && (
                        <LinearProgress color="primary" />
                    )
                }
                <View style={styles.children}>{this.props.children}</View>
            </View>
        );
    }
}
const mapStateToProps = (state: RootState): StateProps => {
    return {
        currentUser: state.currentUser.user
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
)(Layout);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    header: {
        paddingTop: 0,
        opacity: 1,
        borderBottomWidth: 0,
        height: Platform.OS === 'ios' ? 80 : 60,
        
    },
    headergoBack: {
        marginRight: '50%'
    },
    headerLogo: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        maxWidth: '90%'
    },
    headerTitle: {
        color: 'white'
    },
    children: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F266'
    }
});
