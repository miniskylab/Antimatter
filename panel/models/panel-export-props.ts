import {Export} from "antimatter/infrastructures";
import {PanelVariant} from "../variants";
import {PanelComponentProps} from "./panel-component-props";

export type PanelExportProps = Export<PanelComponentProps, PanelVariant>;
