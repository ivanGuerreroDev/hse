import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RootAuthStackParamList,
  RootMainStackParamList,
} from 'utils/types/navigations';
import {refreshToken} from 'utils/cognito/cognito-wrapper';
// Redux
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'state/store/store';
import {forgiveUser, saveUser} from 'state/user/actions';
import {ForgiveUser, IUser, SaveUser} from 'state/user/types';
import {saveFormulariosAsync} from 'state/formulariodinamico/thunk';
import {SaveFormularioAsync} from 'state/formulariodinamico/types';
import {savePerfilesAsync} from 'state/perfil/thunk';
import {SavePerfilAsync} from 'state/perfil/types';

import Lottie from 'components/Lottie';

import Auth from 'views/Auth';
import MainFrame from 'views/MainFrame';
import FormularioDinamico from 'views/FormularioDinamico';

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
};

type Props = StateProps & DispatchProps;

class Index extends Component<Props> {
  state = {
    isLoading: true,
    isValidate: true,
  };

  constructor(props: Props) {
    super(props);

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
          } else {
            props.forgiveUser();
          }
        })
        .catch(err => {
          props.forgiveUser();
        })
        .finally(() => {
          this.setState({isValidate: false});
        });
    } else {
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
        <MainStack.Screen name="FormularioDinamico" component={FormularioDinamico}/>
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
  };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
