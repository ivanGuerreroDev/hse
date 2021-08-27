import _ from 'lodash';
import jmespath from 'jmespath';
import { DocumentoFactory } from './DocumentoFactory';
import { OutputValueChangeCallBack } from 'types/documentofactory';
import { IControl } from 'types/formulariodinamico';

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

  property(propertyName: string): any {
    const propertyValue: any = jmespath.search(
      this.control.properties || [],
      `[?name=='${propertyName}']|[0].value`
    );

    return this.catchValue(propertyValue);
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
    }

    return eval(valueCode);
  }
}
