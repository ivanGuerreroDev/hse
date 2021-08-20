import { NativeSyntheticEvent } from 'react-native';

export type OutputValueChangedEvent = {
  path: string,
  newValue: any,
  oldValue: any
};
export type OutputValueChangeCallBack = (event: OutputValueChangedEvent) => void;
