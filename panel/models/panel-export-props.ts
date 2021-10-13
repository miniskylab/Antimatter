import {Export} from "@miniskylab/antimatter/infrastructure";
import {PanelVariant} from "../variants";
import {PanelComponentProps} from "./panel-component-props";

export type PanelExportProps = Export<PanelComponentProps, PanelVariant>;
