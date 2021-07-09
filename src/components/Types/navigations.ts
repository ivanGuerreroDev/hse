export type AuthStackParamList = {
  SignIn: undefined;
  forgotPassword: undefined;
  ConfirmPassRecovery: {
    rutempresa: string;
    username: string;
    destination: string;
  };
  EndPassRecovery: undefined;
  ForceChangePass: {
    rutempresa: string;
    username: string;
    session: string | undefined;
  };
};

export type RootAuthStackParamList = {
  Auth: undefined;
};

export type RootMainStackParamList = {
  MainFrame: undefined;
};
