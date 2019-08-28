export enum CommandlineArgs {
    image = 'image',
    requireImages = 'require-images',
    output = 'output',
    exportFormat = 'export-format'
}

export enum ExportFormat {
    ts = 'ts',
    js = 'js',
    json = 'json',
    jsonLd = 'json-ld',
    jsonLdJs = 'json-ld-js',
    jsonLdTs = 'json-ld-ts'
}

export enum ErrorMessage {
    noPathDefine = 'No image(s) defined'
}

export interface IGetImageSize {
    imagePath: string;
}

export interface IGetImageSizeMain {
    imagePaths: string[];
}

export interface IGetImageFilePath extends IGetImageSize{}

export interface IImageSize {
    width: number;
    height: number;
    type: string;
    orientation?: number | undefined;
}

export interface IJsonLd {
    '@context': 'http://schema.org',
    '@type': 'QuantitativeValue',
    unitText: 'px',
    disambiguatingDescription: string,
    name: string,
    description: string,
    value: number
}

export interface IJsonLdImageSize {
    width: IJsonLd;
    height: IJsonLd;
}

export type JsonLdImageSizes = IJsonLdImageSize[];

export const jsonExportFormat = new Set([
    ExportFormat.json,
    ExportFormat.js,
    ExportFormat.ts
]);

export const jsonLdExportFormat = new Set([
    ExportFormat.jsonLd,
    ExportFormat.jsonLdJs,
    ExportFormat.jsonLdTs
]);