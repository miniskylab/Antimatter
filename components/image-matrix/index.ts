import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {ImageMatrixComponent} from "./image-matrix-component";
import {ImageMatrixComponentProps} from "./models/image-matrix-component-props";
import {ImageMatrixExporter} from "./models/image-matrix-exporter";

export const ImageMatrixComponentName = Decorator.getValue<string>(ComponentName, ImageMatrixComponentProps);

export {ImageMatrixComponent};
export {ImageMatrixComponentProps};

export {ImageMatrixVariant} from "./variants";
export type {ImageMatrixExportProps as ImageMatrixProps} from "./models/image-matrix-export-props";
export const ImageMatrix = new ImageMatrixExporter().export(ImageMatrixComponent);
