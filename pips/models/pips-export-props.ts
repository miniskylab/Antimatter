import {Export} from "@miniskylab/antimatter/infrastructure";
import {PipsVariant} from "../variants";
import {PipsComponentProps} from "./pips-component-props";
import {PipsShape} from "./pips-shape";

export type PipsExportProps = Export<PipsComponentProps, PipsVariant, {
    readonly shape?: PipsShape | string;
}>;
