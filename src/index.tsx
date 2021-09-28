import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RootAuthStackParamList,
  RootMainStackParamList,
} from 'utils/types/navigations';
import {refreshToken} from 'utils/cognito/cognito-wrapper';
import {isNetworkAllowed} from 'utils/network';

// Redux
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'state/store/store';
// User
import {forgiveUser, saveUser} from 'state/user/actions';
import {ForgiveUser, IUser, SaveUser} from 'state/user/types';
// Formulario
import {saveFormulariosAsync} from 'state/formulariodinamico/thunk';
import {SaveFormularioAsync} from 'state/formulariodinamico/types';
// Perfill
import {savePerfilesAsync} from 'state/perfil/thunk';
import {SavePerfilAsync} from 'state/perfil/types';
import {IPerfil} from 'utils/types/perfil';
// Menu
import {saveMenusAsyncThunk} from 'state/menu/thunk';
import {SaveMenuAsync} from 'state/menu/types';
// Capacitacion
import {saveCapacitacionAsyncThunk} from 'state/capacitacion/thunk';
import {SaveCapacitacionAsync} from 'state/capacitacion/types';
// Observaciones
import {saveObservacionAsyncThunk} from 'state/observacion/thunk';
import {SaveObservacionAsync} from 'state/observacion/types';
// Inspecciones
import {saveInspeccionAsyncThunk} from 'state/inspeccion/thunk';
import {SaveInspeccionAsync} from 'state/inspeccion/types';

import Lottie from 'components/Lottie';

import Auth from 'views/Auth';
import MainFrame from 'views/MainFrame';
import FormularioDinamico from 'views/FormularioDinamico';
import Modal from 'components/Modal';

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
};

type Props = StateProps & DispatchProps;

class Index extends Component<Props> {
  state = {
    isLoading: false,
    isValidate: true,
  };

  constructor(props: Props) {
    super(props);

    if (isNetworkAllowed()) {
      if (props.rememberUser && props.rememberUser.UserTokens.RefreshToken) {
        refreshToken(
          props.rememberUser.UserTokens.RefreshToken,
          props.rememberUser.Empresa,
        )
          .then(result => {
            if (props.rememberUser) {
              let user: IUser = {
                ...props.rememberUser,
                UserTokens: {
                  ...props.rememberUser.UserTokens,
                  AccessToken: result.AuthenticationResult?.AccessToken,
                  IdToken: result.AuthenticationResult?.IdToken,
                },
              };
              props.saveUser(user, true);

              props.saveFormulariosAsync();
              props.savePerfilesAsync(props.rememberUser);
              props.saveMenusAsyncThunk(props.rememberUser);
              props.saveCapacitacionAsyncThunk(props.rememberUser);
              props.saveObservacionAsyncThunk(props.rememberUser);
              props.saveInspeccionAsyncThunk(props.rememberUser);
            } else {
              props.forgiveUser();
            }
          })
          .catch(err => {
            props.forgiveUser();
          })
          .finally(() => {
            this.setState({isValidate: false, isLoading: true});
          });
      } else {
        this.state.isValidate = false;
      }
    } else {
      if (props.rememberUser) {
        props.saveUser(props.rememberUser, true);
      } else {
        props.forgiveUser();
      }
      this.state.isLoading = false;
      this.state.isValidate = false;
    }
  }

  render() {
    const AuthNavigator = (
      <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen name="Auth" component={Auth} />
      </AuthStack.Navigator>
    );

    const AppNavigator = (
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="MainFrame" component={MainFrame} />
        <MainStack.Screen
          name="FormularioDinamico"
          component={FormularioDinamico}
        />
        <MainStack.Screen name="Modal" component={Modal} />
      </MainStack.Navigator>
    );

    const Navigator = this.props.currentUser ? AppNavigator : AuthNavigator;

    if (this.state.isLoading || this.state.isValidate) {
      return (
        <Lottie onAnimationFinish={() => this.setState({isLoading: false})} />
      );
    } else return <NavigationContainer>{Navigator}</NavigationContainer>;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    currentUser: state.currentUser.user,
    rememberUser: state.user.rememberUser,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
): DispatchProps => {
  return {
    forgiveUser: () => dispatch(forgiveUser()),
    saveUser: (user: IUser, remember: boolean) =>
      dispatch(saveUser(user, remember)),
    saveFormulariosAsync: () => dispatch(saveFormulariosAsync()),
    savePerfilesAsync: (user: IUser) => dispatch(savePerfilesAsync(user)),
    saveMenusAsyncThunk: (user: IUser) => dispatch(saveMenusAsyncThunk(user)),
    saveCapacitacionAsyncThunk: (user: IUser) =>
      dispatch(saveCapacitacionAsyncThunk(user)),
    saveObservacionAsyncThunk: (user: IUser) =>
      dispatch(saveObservacionAsyncThunk(user)),
    saveInspeccionAsyncThunk: (user: IUser) =>
      dispatch(saveInspeccionAsyncThunk(user)),
  };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
