import {Export} from "antimatter/infrastructures";
import {ControlsVariant} from "../variants";
import {ControlsComponentProps} from "./controls-component-props";

export type ControlsExportProps = Export<ControlsComponentProps, ControlsVariant>;
