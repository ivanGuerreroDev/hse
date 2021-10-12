export type StaticDeviceInfo = undefined | {
  applicationBuildNumber: number,
  applicationBundleId: number,
  applicationName: string,
  applicationVersion: string,
  availableLocationProviders: any,
  buildId: string,
  brand: string,
  deviceId: string,
  deviceName: string,
  deviceType: string,
  freeDiskStorage: string,
  manufacturer: string,
  systemName: string,
  systemVersion: string,
  totalMemory: number,
  uniqueId: string
};

export type GeolocationInfo = undefined | {
  type: string;
  precision: number;
  X: number;
  Y: number;
  Z: number;
};
