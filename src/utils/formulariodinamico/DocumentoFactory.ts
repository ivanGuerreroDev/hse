import _ from 'lodash'
import { generateUUID4 } from 'utils/rng';

import { ControlBridge } from './ControlBridge';
import { IControl, IDocumento, IFormulario } from 'types/formulariodinamico';
import { OutputValueChangeCallBack } from 'types/documentofactory';

export class DocumentoFactory {
  static createFromFormulario(formulario: IFormulario): IDocumento {
    return _.cloneDeep({
      ...formulario,
      _id: generateUUID4(),
      _formId: formulario._id,
      sentDate: { $date: '' },
      geolocation: undefined,
      profile: undefined,
      user: {},
      device: {}
    });
  }

  private bridgeList: ControlBridge[] = [];

  onOutputValueChange?: OutputValueChangeCallBack;

  constructor(private documento: IDocumento) {
    const redundantRegister = (parentPath: string, controls: IControl[]) => {
      controls.sort((a, b) => a.order - b.order).forEach(control => {
        const path: string = parentPath + control.order;
        let bridge: ControlBridge = new ControlBridge(this, control, path);
        bridge.onOutputValueChange = this.onOutputValueChange;

        this.bridgeList.push(bridge);

        control.controls && redundantRegister(`${path}.`, control.controls);
      });
    }
    redundantRegister('', documento.pages);
  }

  get ControlBridgeList(): ControlBridge[] {
    return this.bridgeList;
  }

  get Documento(): IDocumento {
    return this.documento;
  }
}
