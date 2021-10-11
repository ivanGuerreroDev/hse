import { Platform } from 'react-native';
import {
  check, request,
  Permission, PermissionStatus,
  PERMISSIONS, RESULTS
} from 'react-native-permissions';

export const checkGalleryAccessPermission = (): Promise<PermissionStatus> => {
  return new Promise<PermissionStatus>(async (resolve, reject) => {
    let galleryPermission: PermissionStatus = RESULTS.UNAVAILABLE;
    let galleryPermissionId: Permission;

    switch (Platform.OS) {
      case 'ios':
        galleryPermissionId = PERMISSIONS.IOS.PHOTO_LIBRARY;
        break;

      default:
        galleryPermissionId = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        break;
    }

    console.debug('Check gallery permission');
    galleryPermission = await check(galleryPermissionId);
    if (galleryPermission === RESULTS.DENIED) {
      console.debug('Request gallery permission');
      galleryPermission = await request(galleryPermissionId);
    }

    console.debug(`Returning Gallery permissions: ${galleryPermission}`);
    resolve(galleryPermission);
  });
};

export const checkCameraPermission = (): Promise<PermissionStatus> => {
  return new Promise<PermissionStatus>(async (resolve, reject) => {
    let cameraPermission: PermissionStatus = RESULTS.UNAVAILABLE;
    let cameraPermissionId: Permission;

    switch (Platform.OS) {
      case 'ios':
        cameraPermissionId = PERMISSIONS.IOS.CAMERA;
        break;

      default:
        cameraPermissionId = PERMISSIONS.ANDROID.CAMERA;
        break;
    }

    console.debug('Check camera permission');
    cameraPermission = await check(cameraPermissionId);
    if (cameraPermission === RESULTS.DENIED) {
      console.debug('Request camera permission');
      cameraPermission = await request(cameraPermissionId);
    }

    console.debug(`Returning Camera permissions: ${cameraPermission}`);
    resolve(cameraPermission);
  });
};

export const checkMicrophonePermission = (): Promise<PermissionStatus> => {
  return new Promise<PermissionStatus>(async (resolve, reject) => {
    let microphonePermission: PermissionStatus = RESULTS.UNAVAILABLE;
    let microphonePermissionId: Permission;

    switch (Platform.OS) {
      case 'ios':
        microphonePermissionId = PERMISSIONS.IOS.MICROPHONE;
        break;

      default:
        microphonePermissionId =  PERMISSIONS.ANDROID.RECORD_AUDIO;
        break;
    }

    console.debug('Check microphone permission');
    microphonePermission = await check(microphonePermissionId);
    if (microphonePermission === RESULTS.DENIED) {
      console.debug('Request microphone permission');
      microphonePermission = await request(microphonePermissionId);
    }

    console.debug(`Returning Microphone permissions: ${microphonePermission}`);
    resolve(microphonePermission);
  });
};

export const checkLocationPermission = (): Promise<PermissionStatus> => {
  return new Promise<PermissionStatus>(async (resolve, reject) => {
    let locationPermission: PermissionStatus = RESULTS.UNAVAILABLE;
    let locationPermissionId: Permission;

    switch (Platform.OS) {
      case 'ios':
        locationPermissionId = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        break;

      default:
        locationPermissionId = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        break;
    }

    console.debug('Check location permission');
    locationPermission = await check(locationPermissionId);
    if (locationPermission === RESULTS.DENIED) {
      console.debug('Request location permission');
      locationPermission = await request(locationPermissionId);
    }

    console.debug(`Returning location permissions: ${locationPermission}`);
  });
}
