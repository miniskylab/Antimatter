import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {PipsVariant} from "../variants";
import {PipsComponentProps} from "./pips-component-props";
import {PipsShape} from "./pips-shape";

export type PipsExportProps = ComponentExportProps<PipsComponentProps, PipsVariant, {
    readonly shape?: PipsShape | string;
}>;
