import {
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProvider,
  ConfirmForgotPasswordCommandInput,
  ForgotPasswordCommandInput,
  GetUserCommandInput,
  InitiateAuthCommandInput,
  RespondToAuthChallengeCommandInput,
  ChangePasswordCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import Config from 'react-native-config';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {getUserPool} from 'utils';

const provider = new CognitoIdentityProvider({
  region: Config.Region,
});
// Users
export const getUser = async (accessToken: string) => {
  const command: GetUserCommandInput = {
    AccessToken: accessToken,
  };

  return await provider.getUser(command);
};

export const refreshToken = async (refreshToken: string, empresa: string) => {
  let pool = await getUserPool(empresa);
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
    ClientId: pool.ClientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  return await provider.initiateAuth(command);
};
// Password
export const confirmResetPassword = async (
  confirmationCode: string,
  empresa: string,
  username: string,
  password: string,
) => {
  let pool = await getUserPool(empresa);
  if (!pool.errorType) {
    const command: ConfirmForgotPasswordCommandInput = {
      ClientId: pool.ClientId,
      ConfirmationCode: confirmationCode,
      Username: username,
      Password: password,
    };
    let result = await provider.confirmForgotPassword(command);
    return result;
  }
  return;
};
export const resetPassword = async (username: string, empresa: string) => {
  let pool = await getUserPool(empresa);
  if (!pool.errorType) {
    const command: ForgotPasswordCommandInput = {
      ClientId: pool.ClientId,
      Username: username,
    };

    return await provider.forgotPassword(command);
  }
  return;
};

export const respondNewPassword = async (
  session: string | undefined,
  empresa: string,
  username: string,
  newpassword: string,
) => {
  let pool = await getUserPool(empresa);
  const command: RespondToAuthChallengeCommandInput = {
    ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
    ClientId: pool.ClientId,
    Session: session,
    ChallengeResponses: {
      USERNAME: username,
      NEW_PASSWORD: newpassword,
    },
  };

  return await provider.respondToAuthChallenge(command);
};

export const changePassword = async (
  accessToken: string | undefined,
  password: string,
  newpassword: string,
) => {
  if (accessToken) {
    const command: ChangePasswordCommandInput = {
      AccessToken: accessToken,
      PreviousPassword: password,
      ProposedPassword: newpassword,
    };
    return await provider.changePassword(command);
  }
  return;
};
//Sign
export const signIn = async (
  empresa: string,
  username: string,
  password: string,
) => {
  let pool = await getUserPool(empresa);
  const command: InitiateAuthCommandInput = {
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: pool.ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  return await provider.initiateAuth(command);
};
