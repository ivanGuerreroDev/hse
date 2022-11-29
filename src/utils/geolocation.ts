import Geolocation, { GeolocationError, GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation';
import { RESULTS } from 'react-native-permissions';
import { updateGeolocation } from 'state/settings/actions';
import { store } from 'state/store/store';
import { checkLocationPermission } from './permissions';

checkLocationPermission()
  .then(result => {
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      const positionCallback = (position: GeolocationResponse) => {
        store.dispatch(updateGeolocation(position));
      };

      const errorCallback = (error: GeolocationError) => {
        console.error(error.message);
      };

      const options: GeolocationOptions = {
        timeout: 15 * 1000, //ms: seconds * 1000,
        maximumAge: 3 * 60000, //ms: minutes * 60000
        enableHighAccuracy: true,
      };

      Geolocation.watchPosition(positionCallback, errorCallback, options);
    }
  })
  .catch(error=>console.error(error));

