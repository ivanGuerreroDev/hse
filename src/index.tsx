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
import Lottie from 'components/Lottie/lottie';

import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import Auth from 'views/Auth';
import MainFrame from 'views/MainFrame';

const AuthStack = createStackNavigator<RootAuthStackParamList>();
const MainStack = createStackNavigator<RootMainStackParamList>();

type Props = {
  currentUser: IUser | undefined;
  rememberUser: IUser | undefined;
  forgiveUser: ForgiveUser;
  saveUser: SaveUser;
  isLoading: boolean;
};

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
      console.log('else');
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
      </MainStack.Navigator>
    );
    console.log(this.props.currentUser);

    const Navigator = this.props.currentUser ? AppNavigator : AuthNavigator;

    if (this.state.isLoading /* || this.state.isValidate */) {
      return (
        <View style={styles.lottie}>
          <LottieView
            style={{width: 200, height: 120}}
            source={require('../android/app/src/main/assets/lottie_hse.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => this.setState({isLoading: false})}
          />
        </View>
      );
    } else return <NavigationContainer>{Navigator}</NavigationContainer>;
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

const styles = StyleSheet.create({
  lottie: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    padding: 20,
    marginTop: 240,
  },
});
