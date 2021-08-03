import {ComponentName, Decorator} from "antimatter/infrastructures";
import {ImageMatrixComponent} from "./image-matrix-component";
import {ImageMatrixComponentProps} from "./models/image-matrix-component-props";
import {ImageMatrixExporter} from "./models/image-matrix-exporter";

export const ImageMatrixComponentName = Decorator.getValue(ComponentName, ImageMatrixComponentProps) as string;

export {ImageMatrixComponent};
export {ImageMatrixComponentProps};

export {ImageMatrixVariant} from "./variants";
export type {ImageMatrixExportProps as ImageMatrixProps} from "./models/image-matrix-export-props";
export const ImageMatrix = new ImageMatrixExporter().export(ImageMatrixComponent);
