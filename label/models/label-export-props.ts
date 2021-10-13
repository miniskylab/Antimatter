import {Export} from "@miniskylab/antimatter/infrastructure";
import {LabelVariant} from "../variants";
import {LabelComponentProps} from "./label-component-props";

export type LabelExportProps = Export<LabelComponentProps, LabelVariant>;
