import { request } from 'https';
import { createWriteStream } from 'fs';
import { resolve as resolvePath } from 'path';
import { createHash } from 'crypto';
import getFolderContent from 'vamtiger-get-directory-content';
import createFolder from 'vamtiger-create-directory';
import { IGetImageFilePath } from './types';

const tempFolder = resolvePath(
    __dirname,
    'temp'
);

export default function ({imagePath: url}: IGetImageFilePath) {return new Promise(async (resolve: (imageFilePath: string) => void, reject) => {
    const folderContent = new Set(await getFolderContent(__dirname));
    const chunks: Uint8Array[] = [];

    !folderContent.has('temp') && await createFolder(tempFolder);

    request(url, request => {
        request.on('data', chunk => chunks.push(chunk));

        request.on('end', () => getImageFilePath({url, buffer: Buffer.concat(chunks)}).then(resolve));

        request.on('error', reject);
    }).end();
})}

function getImageFilePath({url, buffer}: {url: string; buffer: Buffer}) {return new Promise((resolve: (imageFilePath: string) => void, reject) => {
    const urlHash = createHash('md5').update(url).digest('hex');
    const imageFilePath = resolvePath(
        tempFolder,
        urlHash
    );

    try {
        const imageFile = createWriteStream(imageFilePath);

        imageFile.on('close', () => resolve(imageFilePath));

        imageFile.write(buffer);
        imageFile.close();
    } catch(error) {
        console.warn(error);
    }

    return imageFilePath;
})}