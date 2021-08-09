import { IControl, IDocumento, IFormulario } from '@Types/formulariodinamico';
import { ControlBridge } from './ControlBridge';

export interface ControlBridgeTreeItem {
  controlBridge: ControlBridge,
  childrens: ControlBridgeTreeItem[]
}

export class DocumentoFactory {
  static createFromFormulario(formulario: IFormulario): IDocumento {
    return {
      ...formulario,
      _formId: '',
      sentDate: { $date: '' },
      geolocation: undefined,
      profile: undefined,
      user: {},
      device: {}
    }
  }

  private controlRegistry: {order: number, parentPath: string, path: string, bridge: ControlBridge}[] = [];

  constructor(private documento: IDocumento) {
    const redundantRegister = (parentPath: string, controls: IControl[]) => {
      controls.sort((a, b) => a.order - b.order).forEach(control => {
        const path: string = parentPath + control.order;
        const bridge: ControlBridge = this.createTypeBridge(control, path, value => console.log('hola'));

        this.controlRegistry.push({order: control.order, parentPath, path, bridge});

        if (control.controls)
          redundantRegister(path + '.', control.controls);
      });
    }
    redundantRegister('', documento.pages);
  }

  get ControlBridgeList(): ControlBridge[] {
    return this.controlRegistry.map(item => item.bridge);
  }

  get ControlBridgeTree(): ControlBridgeTreeItem[] {
    type FControlBridgeTree = (parentPath: string) => ControlBridgeTreeItem[]
    const redudantTreeBuilder: FControlBridgeTree = (parentPath: string) => {
      return this.controlRegistry
        .filter(item => item.parentPath === parentPath)
        .sort((a, b) => a.order - b.order)
        .map(item => {
          return {
            controlBridge: item.bridge,
            childrens: redudantTreeBuilder(item.path + '.')
          };
        });
    };

    return redudantTreeBuilder('');
  }

  get Documento(): IDocumento {
    return this.documento;
  }

  private createTypeBridge(control: IControl, path: string, onOutputValueChange?: (outputValue: any) => void): ControlBridge {
    let TypeBridge = ControlBridge;
    switch (control.type) {
      default: break;
    }
    return new TypeBridge(control, path, onOutputValueChange);
  }
}
