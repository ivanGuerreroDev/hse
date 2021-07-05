import {
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProvider,
  ConfirmForgotPasswordCommandInput,
  ForgotPasswordCommandInput,
  GetUserCommandInput,
  InitiateAuthCommandInput,
  RespondToAuthChallengeCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import Config from 'react-native-config';
/* import CriptoJS from 'crypto-js'; */
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

const provider = new CognitoIdentityProvider({
  region: Config.Region,
});

/* const hashSecret = (message: string) => {
  return CriptoJS.HmacSHA256(message, Config.COGNITO_SECRET_HASH).toString(
    CriptoJS.enc.Base64,
  );
}; */

export const confirmResetPassword = async (
  confirmationCode: string,
  username: string,
  password: string,
) => {
  const command: ConfirmForgotPasswordCommandInput = {
    ClientId: Config.COGNITO_CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: username,
    Password: password,
  };

  return await provider.confirmForgotPassword(command);
};

export const getUser = async (accessToken: string) => {
  const command: GetUserCommandInput = {
    AccessToken: accessToken,
  };

  return await provider.getUser(command);
};

export const refreshToken = async (username: string, refreshToken: string) => {
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: Config.COGNITO_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  return await provider.initiateAuth(command);
};

export const resetPassword = async (username: string) => {
  const command: ForgotPasswordCommandInput = {
    ClientId: Config.COGNITO_CLIENT_ID,
    Username: username,
  };

  return await provider.forgotPassword(command);
};

export const respondNewPassword = async (
  username: string,
  password: string,
) => {
  const command: RespondToAuthChallengeCommandInput = {
    ClientId: Config.COGNITO_CLIENT_ID,
    ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
    ChallengeResponses: {
      USERNAME: username,
      PASSwORD: password,
    },
  };

  return await provider.respondToAuthChallenge(command);
};

export const signIn = async (
  clientid: string,
  username: string,
  password: string,
) => {
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: clientid,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  return await provider.initiateAuth(command);
};
