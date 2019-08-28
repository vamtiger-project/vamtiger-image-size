import { parse as parsePath, resolve as resolvePath } from 'path';
import Args from 'vamtiger-argv/build/main';
import { IGetImageSizeMain, IImageSize, CommandlineArgs, ExportFormat, jsonLdExportFormat, jsonExportFormat } from './types';
import Require from 'vamtiger-require';
import createFile from 'vamtiger-create-file';
import getImageSize from './get-image-size';

const { stringify } = JSON;
const { cwd } = process;
const workingDirectory = cwd();
const args = new Args();
const images = args.has(CommandlineArgs.image) && args
    .getAll(CommandlineArgs.image)
    .map(image => resolvePath(workingDirectory, image));
const requireImages = args.has(CommandlineArgs.requireImages) && args.get(CommandlineArgs.requireImages) && resolvePath(
    workingDirectory,
    args.get(CommandlineArgs.requireImages) as string
);
const output = args.has(CommandlineArgs.output) && args.get(CommandlineArgs.output) && resolvePath(
    workingDirectory,
    args.get(CommandlineArgs.output) as string
);
const exportFormat = (args.has(CommandlineArgs.exportFormat) && args.get(CommandlineArgs.exportFormat) || output && parsePath(output).ext.slice(1)) as ExportFormat;
const requiredImages = requireImages && Require({path: requireImages});
const imagePaths = images || Array.isArray(requiredImages) && requiredImages as string[] || [];
const createdUsing = 'vamtiger-image-size';
const date = new Date().toISOString();
const jsonLdBase = {
    '@context': 'http://schema.org',
    '@type': 'QuantitativeValue',
    unitText: 'px',
    disambiguatingDescription: `This was created using ${createdUsing} on ${date}`
};

imagePaths.length && getImageSizes({imagePaths})
    .catch(handleError);

export default async function getImageSizes({imagePaths}: IGetImageSizeMain) {
    const currentImageSizes = await Promise.all(imagePaths.map(imagePath => getImageSize({imagePath})));
    const imageSizes = currentImageSizes.filter(imageSize => imageSize) as IImageSize[];
    const json = imageSizes.length && exportFormat && jsonExportFormat.has(exportFormat) && stringify(imageSizes);
    const js = json && exportFormat === ExportFormat.js && `module.exports = ${json};`;
    const ts = json && exportFormat === ExportFormat.ts && `export default ${json}`;
    const jsonLd = imageSizes.length && exportFormat && jsonLdExportFormat.has(exportFormat)  && stringify(imageSizes.map(({width, height, type}) => ({
        width: {
            ...jsonLdBase,
            name: `${type} image width`,
            description: `${type} image width of ${width}${jsonLdBase.unitText}`,
            value: width
        },
        height: {
            ...jsonLdBase,
            name: `${type} image height`,
            description: `${type} image height of ${height}${jsonLdBase.unitText}`,
            value: height
        }
    })));
    const jsonLdJs = jsonLd && exportFormat === ExportFormat.jsonLdJs && `module.exports = ${jsonLd};`;
    const jsonLdTs = jsonLd && exportFormat === ExportFormat.jsonLdTs && `export default ${jsonLd};`;
    const exportText = ts || js || json || jsonLd || jsonLdJs || jsonLdTs;

    output && exportText && await createFile(output, exportText);

    return imageSizes;
}

function handleError(error: Error) {
    throw error;
}