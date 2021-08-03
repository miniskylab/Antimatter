import {Export} from "antimatter/infrastructures";
import {ImageMatrixVariant} from "../variants";
import {ImageMatrixComponentProps} from "./image-matrix-component-props";

export type ImageMatrixExportProps = Export<ImageMatrixComponentProps, ImageMatrixVariant>;
