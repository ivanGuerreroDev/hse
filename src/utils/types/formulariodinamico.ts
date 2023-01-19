import { Method } from 'axios';
import { ControlType } from './controltypes';
import { IPerfil } from './perfil';
import { IUser } from 'state/user/types';
import { GeolocationResponse } from '@react-native-community/geolocation';
export interface ITaggeable {
    keywords?: INameValue[];
    tags?: string[];
}

export interface IControl extends ITaggeable {
    type: ControlType;
    order: number;
    properties?: INameValue[];
    outputValue?: any;
    outputMetadata?: {
        schema: object;
        validateSchema?: boolean;
        outputValidationErrorMessage?: string;
        customValidation?: string;
        defaultValue?: any;
        updateOnChanges?: boolean | string;
    };
    controls?: IControl[];
}

export interface IDate {
    $date: string;
}

export enum DocumentoStatus {
    draft,
    sending,
    sent
}

export interface IDocumento extends IFormulario {
    _formId: string;
    sentDate: IDate | undefined;
    status: DocumentoStatus;
    geolocation: GeolocationResponse | undefined;
    profile: IPerfil;
    user: IUser | undefined;
    device: {
        applicationBuildNumber: number;
        applicationBundleId: number;
        applicationName: string;
        applicationVersion: string;
        availableLocationProviders: any;
        buildId: string;
        brand: string;
        deviceId: string;
        deviceName: string;
        deviceType: string;
        freeDiskStorage: number;
        manufacturer: string;
        systemName: string;
        systemVersion: string;
        totalMemory: number;
        uniqueId: string;
    };
}

export interface IFormulario extends ITaggeable {
    _id: string;
    name: string;
    title: string;
    version: number;
    creationDate: IDate;
    modifiedDate: IDate;
    pages: IPage[];
    resources?: IResource[];
    hooks: [];
}

export interface INameValue {
    name: string;
    value: any;
}

export interface IPage extends IControl {
    controls: IControl[];
}

export interface IResource {
    name: string;
    url: string;
    type: 'object' | 'api';
    method?: Method;
    data?: any;
    headers?: any;
}

export interface ILocalResource {
    name?: string;
    url: string;
    type: 'object' | 'api';
    method?: Method;
    data?: any;
    headers?: any;
    localData: any;
}
