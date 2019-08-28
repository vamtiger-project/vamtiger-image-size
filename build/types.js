"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandlineArgs;
(function (CommandlineArgs) {
    CommandlineArgs["image"] = "image";
    CommandlineArgs["requireImages"] = "require-images";
    CommandlineArgs["output"] = "output";
    CommandlineArgs["exportFormat"] = "export-format";
})(CommandlineArgs = exports.CommandlineArgs || (exports.CommandlineArgs = {}));
var ExportFormat;
(function (ExportFormat) {
    ExportFormat["ts"] = "ts";
    ExportFormat["js"] = "js";
    ExportFormat["json"] = "json";
    ExportFormat["jsonLd"] = "json-ld";
    ExportFormat["jsonLdJs"] = "json-ld-js";
    ExportFormat["jsonLdTs"] = "json-ld-ts";
})(ExportFormat = exports.ExportFormat || (exports.ExportFormat = {}));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["noPathDefine"] = "No image(s) defined";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
exports.jsonExportFormat = new Set([
    ExportFormat.json,
    ExportFormat.js,
    ExportFormat.ts
]);
exports.jsonLdExportFormat = new Set([
    ExportFormat.jsonLd,
    ExportFormat.jsonLdJs,
    ExportFormat.jsonLdTs
]);
//# sourceMappingURL=types.js.map