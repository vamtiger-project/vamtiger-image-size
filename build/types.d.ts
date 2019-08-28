export declare enum CommandlineArgs {
    image = "image",
    requireImages = "require-images",
    output = "output",
    exportFormat = "export-format"
}
export declare enum ExportFormat {
    ts = "ts",
    js = "js",
    json = "json",
    jsonLd = "json-ld",
    jsonLdJs = "json-ld-js",
    jsonLdTs = "json-ld-ts"
}
export declare enum ErrorMessage {
    noPathDefine = "No image(s) defined"
}
export interface IGetImageSize {
    imagePath: string;
}
export interface IGetImageSizeMain {
    imagePaths: string[];
}
export interface IGetImageFilePath extends IGetImageSize {
}
export interface IImageSize {
    width: number;
    height: number;
    type: string;
    orientation?: number | undefined;
}
export interface IJsonLd {
    '@context': 'http://schema.org';
    '@type': 'QuantitativeValue';
    unitText: 'px';
    disambiguatingDescription: string;
    name: string;
    description: string;
    value: number;
}
export interface IJsonLdImageSize {
    width: IJsonLd;
    height: IJsonLd;
}
export declare type JsonLdImageSizes = IJsonLdImageSize[];
export declare const jsonExportFormat: Set<ExportFormat>;
export declare const jsonLdExportFormat: Set<ExportFormat>;
