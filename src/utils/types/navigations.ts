import { IDocumento } from 'types/formulariodinamico';

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
  SubMenu: {
    titulo: string;
    submenulist:
      | {
          titulo: string;
          navigate: string;
        }[]
      | undefined;
    submenuaccordion:
      | {
          menuPadre: string;
          expand: boolean;
          menuhijo: {
            subtitulo: string;
            navigate: string;
          }[];
        }[]
      | undefined;
    submenuCard:
      | {
          tipo: string;
          titulo: string;
          cargo: string;
          navigate: string;
        }[]
      | undefined;
  };

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
  FormularioDinamico: {
    documento: IDocumento
  }
};
