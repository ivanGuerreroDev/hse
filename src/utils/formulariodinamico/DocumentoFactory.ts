import _ from 'lodash';
import {formatRFC3339} from 'date-fns';
import {generateUUID4} from 'utils/rng';

import {ControlBridge} from './ControlBridge';
import {
  DocumentoStatus,
  IControl,
  IDocumento,
  IFormulario,
} from 'types/formulariodinamico';
import {
  OutputValueChangeCallBack,
  OutputValueChangedEvent,
} from 'types/documentofactory';

import {store} from 'state/store/store';

export class DocumentoFactory {
  static createFromFormulario(formulario: IFormulario): IDocumento {
    const creationDate = {
      $date: formatRFC3339(new Date(), {fractionDigits: 3}),
    };

    const currentUser = store.getState().currentUser.user;
    const currentProfile = store.getState().perfiles.perfiles
      .filter(item => item.NombreUsuario === currentUser?.Username)[0]

    return _.cloneDeep({
      ...formulario,
      _id: generateUUID4(),
      _formId: formulario._id,
      creationDate: creationDate,
      modifiedDate: creationDate,
      sentDate: {$date: ''},
      status: DocumentoStatus.draft,
      geolocation: store.getState().deviceInfo.geolocation,
      profile: currentProfile,
      user: currentUser,
      device: store.getState().deviceInfo.info,
    });
  }

  private bridgeList: ControlBridge[] = [];
  private outputValueChangeCallBack: OutputValueChangeCallBack = (
    event: OutputValueChangedEvent,
  ) => {
    this.onOutputValueChange?.(event);
  };

  isReadOnly: boolean = false;
  onOutputValueChange?: OutputValueChangeCallBack;

  constructor(private documento: IDocumento) {
    const redundantRegister = (parentPath: string, controls: IControl[]) => {
      controls
        .sort((a, b) => a.order - b.order)
        .forEach(control => {
          const path: string = parentPath + control.order;
          let bridge: ControlBridge = new ControlBridge(this, control, path);
          bridge.onOutputValueChange = this.outputValueChangeCallBack;

          this.bridgeList.push(bridge);

          control.controls && redundantRegister(`${path}.`, control.controls);
        });
    };
    redundantRegister('', documento.pages);
  }

  get ControlBridgeList(): ControlBridge[] {
    return this.bridgeList;
  }

  get Documento(): IDocumento {
    return this.documento;
  }

  validateOutputValues(): Array<string> {
    let errorStack: Array<string> = [];
    this.bridgeList.forEach(controlBridge => {
      const validate = controlBridge.validateOutputValue();

      if (validate) errorStack.push(validate);
    });

    return errorStack;
  }
}
