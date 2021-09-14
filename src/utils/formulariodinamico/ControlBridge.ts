import _ from 'lodash';
import ajv from 'ajv';
import jmespath from 'jmespath';
import { DocumentoFactory } from './DocumentoFactory';
import { OutputValueChangeCallBack } from 'types/documentofactory';
import { IControl, ILocalResource, IResource } from 'types/formulariodinamico';
import { RootState, store } from 'state/store/store';

export class ControlBridge {
  requiredProperties: Array<string> = [
    'visible'
  ];

  onOutputValueChange?: OutputValueChangeCallBack;

  constructor(private factory: DocumentoFactory, private control: IControl, private path: string) {}

  get Control(): IControl {
    return this.control;
  }

  get Path(): string {
    return this.path;
  }

  get OutputValue(): any {
    return this.control.outputValue;
  }

  set OutputValue(value: any) {
    const oldValue = _.cloneDeep(this.control.outputValue);
    this.control.outputValue = value;
    this.onOutputValueChange?.({
      path: this.Path,
      newValue: value,
      oldValue: oldValue
    });
  }

  get ReadOnly(): boolean {
    return this.factory.isReadOnly;
  }

  property(propertyName: string): any {
    const propertyValue: any = jmespath.search(
      this.control.properties || [],
      `[?name=='${propertyName}']|[0].value`
    );

    return this.catchValue(propertyValue);
  }

  validateOutputValue(): string | undefined {
    if (this.control.outputMetadata?.validateSchema) {
      const schemaValidator = new ajv();
      const validate = schemaValidator.compile(this.control.outputMetadata.schema);
      if (!validate(this.control.outputValue)) {
        return this.control.outputMetadata.outputValidationErrorMessage || 'unknown';
      }
    }
    if (this.control.outputMetadata?.customValidation) {
      return this.excecuteValueCode(
        `const value = ${JSON.stringify(this.control.outputValue)};\n${this.control.outputMetadata.customValidation}`
      );
    }
  }

  private catchValue(param: any): any {
    if (Array.isArray(param)) {
      return param.map(item => this.catchValue(item));
    }
    if (typeof param === 'object' && param !== null) {
      if('!code' in param) {
        return this.excecuteValueCode(param['!code']);
      }

      Object.keys(param).forEach(key => {
        param[key] = this.catchValue(param[key]);
      });
    }

    return param;
  }

  private excecuteValueCode(valueCode: string): any {
    const control = (path: string) => {
      const controlBridge: ControlBridge | undefined = this.factory.ControlBridgeList.filter(controlBridge => {
        return controlBridge.Path === path;
      })?.[0];

      return controlBridge?.OutputValue;
    };

    const resource = (resourceName: string): any => {
      if (!this.factory.Documento.resources) throw `Este documento no tiene configurado los recursos`;

      const documentoResources: IResource[] = this.factory.Documento.resources
        ?.filter(resource => resource.name === resourceName);
      if (documentoResources.length === 0) throw `El recurso ${resourceName} no existe en este documento`;
      const documentoResource: IResource = documentoResources[0];

      const state: RootState = store.getState();
      const localResource: ILocalResource = state.resources.resources
        .filter(item =>
          item.url === documentoResource.url &&
          item.type === documentoResource.type &&
          item.method === documentoResource.method &&
          item.body === documentoResource.body)
        [0];

      return localResource.localData;
    };

    return eval(valueCode);
  }
}
