import {Export} from "@miniskylab/antimatter/infrastructure";
import {ControlsVariant} from "../variants";
import {ControlsComponentProps} from "./controls-component-props";

export type ControlsExportProps = Export<ControlsComponentProps, ControlsVariant>;
