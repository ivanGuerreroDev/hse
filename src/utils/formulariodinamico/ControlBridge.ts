import _ from 'lodash';
import ajv from 'ajv';
import jmespath from 'jmespath';
import {generateRandomString} from 'utils/rng';
import {DocumentoFactory} from './DocumentoFactory';
import {OutputValueChangeCallBack} from 'types/documentofactory';
import {IControl, ILocalResource, IResource} from 'types/formulariodinamico';
import {RootState, store} from 'state/store/store';
import {saveResource} from 'state/formulariodinamico/actions';

export class ControlBridge {
  requiredProperties: Array<string> = ['visible'];

  onOutputValueChange?: OutputValueChangeCallBack;

  constructor(
    private factory: DocumentoFactory,
    private control: IControl,
    private path: string,
    private dataCode: string
  ) {}

  get Control(): IControl {
    return this.control;
  }

  get Path(): string {
    return this.path;
  }

  get RawOutputValue(): any {
    return this.control.outputValue;
  }

  get OutputValue(): any {
    return this.catchValue(
      _.cloneDeep(this.control.outputValue)
    );
  }
  set OutputValue(value: any) {
    const oldValue = _.cloneDeep(this.control.outputValue);
    this.control.outputValue = value;
    this.onOutputValueChange?.({
      path: this.Path,
      newValue: value,
      oldValue: oldValue,
    });
  }

  get DataCode(): any {
    return this.dataCode;
  }

  set DataCode(value: any) {
    this.dataCode = value;
  }



  get ReadOnly(): boolean {
    return this.factory.isReadOnly;
  }

  updateDevaultValue() {
    if (this.control.outputMetadata?.defaultValue) {
      if (this.control.outputMetadata.updateOnChanges || !this.OutputValue) {
        const newValue = this.catchValue(this.control.outputMetadata.defaultValue);

        if (!_.isEqual(this.OutputValue, newValue))
          this.OutputValue = newValue;
      }
    }
  }

  createResource(uri: string) {
    const resourceName: string = generateRandomString(12);
    let resource: IResource = {
      name: resourceName,
      type: 'object',
      url: uri,
    };

    const localResource: ILocalResource = {
      url: uri,
      type: 'object',
      localData: uri,
    };
    store.dispatch(saveResource(localResource));

    if (!this.factory.Documento.resources)
      this.factory.Documento.resources = [];
    this.factory.Documento.resources.push(resource);

    return {
      '!code': `resource('${resourceName}')`,
    };
  }

  rawProperty(propertyName: string): any {
    const propertyValue: any = jmespath.search(
      this.control.properties || [],
      `[?name=='${propertyName}']|[0].value`,
    );

    return propertyValue;
  }

  property(propertyName: string): any {
    const propertyValue: any = jmespath.search(
      this.control.properties || [],
      `[?name=='${propertyName}']|[0].value`,
    );
    return this.catchValue(propertyValue);
  }

  getDataValueCode(): any {
    if(this.dataCode){
      return this.excecuteValueCode(this.dataCode);
    }else{
      return null
    }

  }

  properties(): any {
    return this.catchValue(this.control.properties);
  }

  validateOutputValue(): string | undefined {
    if (this.control.outputMetadata?.validateSchema) {
      const schemaValidator = new ajv();
      const validate = schemaValidator.compile(
        this.control.outputMetadata.schema,
      );
      if (!validate(this.control.outputValue)) {
        return (
          this.control.outputMetadata.outputValidationErrorMessage || 'unknown'
        );
      }
    }
    if (this.control.outputMetadata?.customValidation) {
      return this.excecuteValueCode(
        `(() => {\n\
          const value = ${JSON.stringify(this.control.outputValue)};\n\
          return ${this.control.outputMetadata.customValidation}\n\
        })()`,
      );
    }
  }

  private catchValue(param: any): any {
    if (Array.isArray(param)) {
      return param.map(item => this.catchValue(item));
    }
    if (typeof param === 'object' && param !== null) {
      if ('!code' in param) {
        if(param['!code']) this.dataCode = param['!code'];
        return this.excecuteValueCode(param['!code']);
      }

      Object.keys(param).forEach(key => {
        param[key] = this.catchValue(param[key]);
      });
    }

    return param;
  }

  private excecuteValueCode(valueCode: string): any {
    const formatControlReturn = (
      controlBridge: ControlBridge | undefined,
      properties: Array<string> | undefined,
      output: boolean
    ): any => {

      if (controlBridge === undefined)
        return undefined;
      else if ((!properties || properties.length === 0) && output)
        return controlBridge.OutputValue;
      else if (properties && properties.length > 0 && !output)
        return properties.reduce((prev: {[key: string]: any}, curr: string) => {
          prev[curr] = controlBridge.property(curr);
          return prev;
        }, {});
      else if (properties && properties?.length > 0 && output)
        return {
          properties: properties.reduce((prev: {[key: string]: any}, curr: string) => {
              prev[curr] = controlBridge.property(curr);
              return prev;
            }, {}),
          outputValue: controlBridge.OutputValue
        };
      else
        return undefined;
    };

    const control = (
      path: string,
      properties: Array<string> | undefined = undefined,
      output: boolean = true
    ): any => {
      const controlBridge: ControlBridge | undefined =
        this.factory.ControlBridgeList.filter(controlBridge => {
          return controlBridge.Path === path;
        })?.[0];
      return formatControlReturn(controlBridge, properties, output);
    };

    const controls = (
      filters: Array<{type: string, path: string}>,
      properties: Array<string> | undefined = undefined,
      output: boolean = true
    ): Array<any> => {
      let controlBridges: Array<ControlBridge> = [];
      filters.forEach(filter => {
        const controlBridgesFound: Array<ControlBridge> =
          this.factory.ControlBridgeList.filter(controlBridge => {
            return controlBridge.Path.startsWith(filter.path)
              && (controlBridge.Control.type === filter.type || filter.type === '*');
          });

        controlBridgesFound.forEach(controlBridge => {
          if (!controlBridges.map(controlBridge => controlBridge.Path).includes(controlBridge.Path))
            controlBridges.push(controlBridge);
        });
      });

      return controlBridges.map(controlBridge => formatControlReturn(controlBridge, properties, output));
    };

    const me = (
      properties: Array<string> | undefined = undefined,
      output: boolean = true
    ): any => {
      return formatControlReturn(this, properties, output);
    };

    const resource = (resourceName: string): any => {
      if (!this.factory.Documento.resources)
        throw `Este documento no tiene configurado los recursos`;

      const documentoResources: IResource[] =
        this.factory.Documento.resources?.filter(
          resource => resource.name === resourceName,
        );
      if (documentoResources.length === 0)
        throw `El recurso ${resourceName} no existe en este documento`;
      const documentoResource: IResource = documentoResources[0];

      const state: RootState = store.getState();

      const localResource: ILocalResource = state.resources.resources.filter(
        item =>
          item.url === documentoResource.url &&
          item.type === documentoResource.type &&
          item.method === documentoResource.method &&
          item.data === documentoResource.data &&
          item.headers === documentoResource.headers
      )[0];
      return localResource.localData;
    };

    const lineCode = valueCode?.startsWith('return') ? valueCode : `return ${valueCode}`;

    return new Function(
      'control',
      'controls',
      'me',
      'resource',
      lineCode
    )(
      control,
      controls,
      me,
      resource
    );
  }
}
