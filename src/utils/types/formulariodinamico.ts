import { Method } from 'axios';
import { ControlType } from './controltypes';
import { IPerfil } from './perfil';
import { GeolocationInfo, StaticDeviceInfo } from './deviceInfo';
import { IUser } from 'state/user/types';
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
  geolocation: GeolocationInfo;
  profile: IPerfil;
  user: IUser | undefined;
  device: StaticDeviceInfo;
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

export interface IPage extends IControl{
  controls: IControl[];
}

export interface IResource {
  name: string;
  url: string;
  type: 'object' | 'api';
  method?: Method;
  body?: string;
}

export interface ILocalResource {
  url: string;
  type: 'object' | 'api';
  method?: Method;
  body?: string;
  localData: any;
}
