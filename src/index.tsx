import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RootAuthStackParamList,
  RootMainStackParamList,
} from 'components/Types/navigations';
import {refreshToken} from 'views/Auth/cognito/cognito-wrapper';
import {connect} from 'react-redux';
import {RootState} from 'state/store/store';
import {forgiveUser, saveUser} from 'state/user/actions';
import {ForgiveUser, IUser, SaveUser} from 'state/user/types';
// Views
import Auth from 'views/Auth/index';
import Home from 'views/Home/index';

const AuthStack = createStackNavigator<RootAuthStackParamList>();
const MainStack = createStackNavigator<RootMainStackParamList>();

type Props = {
  currentUser: IUser | undefined;
  rememberUser: IUser | undefined;
  forgiveUser: ForgiveUser;
  saveUser: SaveUser;
};

class Index extends Component<Props> {
  constructor(props: Props) {
    super(props);

    if (props.rememberUser && props.rememberUser.UserTokens.RefreshToken) {
      refreshToken(
        props.rememberUser.Username,
        props.rememberUser.UserTokens.RefreshToken,
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
          } else {
            props.forgiveUser();
          }
        })
        .catch(err => {
          props.forgiveUser();
        });
    }
  }
  render() {
    const AuthNavigator = (
      <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen name="Auth" component={Auth} />
      </AuthStack.Navigator>
    );

    const AppNavigator = (
      <MainStack.Navigator>
        <MainStack.Screen name="MainFrame" component={Home} />
      </MainStack.Navigator>
    );

    const Navigator = this.props.currentUser ? AppNavigator : AuthNavigator;
    return <NavigationContainer>{Navigator}</NavigationContainer>;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.currentUser.user,
    rememberUser: state.user.rememberUser,
  };
};

const mapDispatchToProps = {
  forgiveUser,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
