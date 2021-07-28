export type AuthStackParamList = {
  SignIn: undefined;
  ForceChangePass: {
    rutempresa: string;
    username: string;
    session: string | undefined;
  };
  forgotPassword: undefined;
  ConfirmPassRecovery: {
    rutempresa: string;
    username: string;
    destination: string;
  };
  EndPassRecovery: undefined;
};

export type MainFrameStackParamList = {
  Home: undefined;
  Menu: undefined;
  Capacitaciones: undefined;
  Inspecciones: undefined;
  Observaciones: undefined;

  Documents: undefined;
  Notifications: undefined;

  Profile: undefined;
  changePass: undefined;
};

export type RootAuthStackParamList = {
  Auth: undefined;
};

export type RootMainStackParamList = {
  MainFrame: undefined;
};
