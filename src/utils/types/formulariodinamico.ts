export interface ITaggeable {
  keywords?: INameValue[];
  tags?: string[];
}

export interface IControl extends ITaggeable {
  type: string;
  order: number;
  properties?: INameValue[];
  outputValue: any;
  outputMetadata: any;
  controls?: IControl[];
}

export interface IDate {
  $date: string;
}

export interface IDocumento extends IFormulario {
  _formId: string;
  sentDate: IDate | undefined;
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
