import { NavigatorScreenParams } from '@react-navigation/native';
import { IDocumento } from 'types/formulariodinamico';
import { ICapacitacion } from 'utils/types/menu';

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
    };
    Documents: undefined;
    Notifications: undefined;
    Profile: undefined;
    changePass: undefined;
};

export type RootAuthStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type RootMainStackParamList = {
    MainFrame: NavigatorScreenParams<MainFrameStackParamList>;
    FormularioDinamico: {
        documento: IDocumento;
        readOnly?: boolean;
    };
    Modal: JSX.Element;
    Capacitaciones: {
        selected: any;
    };
    Relator: undefined;
    List: {
        participantes: any;
    };
};
