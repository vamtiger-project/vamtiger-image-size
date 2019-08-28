import { promisify } from 'util';
import * as sizeOf from 'image-size';
import isRemoteUrl from 'vamtiger-is-remote-url';
import bash from 'vamtiger-bash';
import { IGetImageSize } from './types';
import getImageFilePath from './get-image-file-path';

const getImageSize = promisify(sizeOf);

export default async function({ imagePath }: IGetImageSize) {
    const remoteUrl = await isRemoteUrl({url: imagePath});
    const remoteImagePath = remoteUrl && await getImageFilePath({ imagePath });
    const imageFilePath = remoteImagePath || imagePath;
    const imageInfo = imageFilePath && await getImageSize(imageFilePath);
    const imageSize = imageInfo && {...imageInfo};
    const remove = imageFilePath && `rm "${imageFilePath}"`;

    remove && await bash(remove);

    return imageSize;
}