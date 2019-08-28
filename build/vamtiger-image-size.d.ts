import { IGetImageSizeMain, IImageSize } from './types';
export default function getImageSizes({ imagePaths }: IGetImageSizeMain): Promise<IImageSize[]>;
