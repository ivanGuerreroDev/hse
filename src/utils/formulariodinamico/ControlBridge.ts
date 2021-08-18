import { IControl } from 'types/formulariodinamico';
import jmespath from 'jmespath';
import { ReactElement } from 'react';
import { Text } from 'react-native-elements';

export class ControlBridge {
  constructor(private control: IControl, private path: string, private onOutputValueChange?: (outputValue: any) => void) {}

  get Control(): IControl {
    return this.control;
  }

  get Path(): string {
    return this.path;
  }

  get RenderUI(): JSX.Element {
    return Text({
      children: `El control ${this.control.type} aún no se ha creado`
    }) as ReactElement<any, any>;
  }

  get OutputValue(): any {
    return this.control.outputValue;
  }

  set OutputValue(value: any) {
    this.control.outputValue = value;
    this.onOutputValueChange?.(value);
  }

  property(propertyName: string): any {
    return jmespath.search(
      this.control.properties || [],
      `[?name=='${propertyName}']|[0].value`
    );
  }
}
