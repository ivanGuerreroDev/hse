import _ from 'lodash';
import jmespath from 'jmespath';
import { Store } from 'redux';

function defaultCompare<T>(a: T, b: T) {
  return a === b;
}

export const stateMonitor = (
  store: Store,
  path: string,
  callback: (newValue: any, oldValue: any) => void
) => {
  return store.subscribe((() => {
    let currentValue = jmespath.search(store.getState(), path);

    return () => {
      let newValue = jmespath.search(store.getState(), path);
      if (!defaultCompare(currentValue, newValue)) {
        let oldValue = currentValue;
        currentValue = newValue;
        callback(newValue, oldValue);
      }
    };
  })());
};
