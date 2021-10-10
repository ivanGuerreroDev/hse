import CameraRoll, { GetPhotosParams } from '@react-native-community/cameraroll';
import { Platform } from 'react-native';
import fs from 'react-native-fs';
import _ from 'lodash';

const fixPath = (path: string): string => {
  switch (Platform.OS) {
    case 'android':
      if (path.startsWith('file://'))
        return path;
      else
        return `file://${path}`;

    default:
      return path;
  }
};

const isVideo = (path: string): boolean => {
  const extension = _.last(path.split('.')) || '';

  return [
    'mp4',
    'mov'
  ].includes(extension);
};

export type MediaUri = {
  uri: string;
  isVideo: boolean;
}

export const getGalleryMedia: () => Promise<Array<MediaUri>> = async () => {
  let galleryMediaUris: Array<MediaUri> = [];

  const photoIdentifiersPage = await CameraRoll.getPhotos({first: 10000});
  photoIdentifiersPage.edges.forEach(item => {
    galleryMediaUris.push({
      uri: fixPath(item.node.image.uri),
      isVideo: item.node.type.includes('video')
    });
  });

  return galleryMediaUris;
};

export const getCachedMedia: () => Promise<Array<MediaUri>> = async () => {
  const cachedItems = await fs.readDir(fs.CachesDirectoryPath);
  const cachedCameraDir = cachedItems.find(item => item.name === 'Camera');

  let cachedMediaUris: Array<MediaUri> = [];

  if (cachedCameraDir) {
    (await fs.readDir(cachedCameraDir.path))
      .forEach(item => cachedMediaUris.push({
        uri: fixPath(item.path),
        isVideo: isVideo(item.path)
      }));
  }

  return cachedMediaUris;
};
