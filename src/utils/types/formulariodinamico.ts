import { ControlType } from './controltypes';
export interface ITaggeable {
  keywords?: INameValue[];
  tags?: string[];
}

export interface IControl extends ITaggeable {
  type: ControlType;
  order: number;
  properties?: INameValue[];
  outputValue?: any;
  outputMetadata?: any;
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
  status: DocumentoStatus,
  geolocation: {
    type: string;
    precision: number;
    X: number;
    Y: number;
    Z: number;
  } | undefined;
  profile: any;
  user: object;
  device: object;
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
  method: string;
  body: string;
}
