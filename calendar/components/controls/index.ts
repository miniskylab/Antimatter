import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {ControlsComponent} from "./controls-component";
import {ControlsComponentProps} from "./models/controls-component-props";
import {ControlsExporter} from "./models/controls-exporter";

export const ControlsComponentName = Decorator.getValue<string>(ComponentName, ControlsComponentProps);

export {ControlsComponent};
export {ControlsComponentProps};

export {ControlsVariant} from "./variants";
export type {ControlsExportProps as ControlsProps} from "./models/controls-export-props";
export const Controls = new ControlsExporter().export(ControlsComponent);
