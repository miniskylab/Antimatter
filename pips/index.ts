import {ComponentName, Decorator} from "antimatter/infrastructures";
import {PipsComponentProps} from "./models/pips-component-props";
import {PipsExporter} from "./models/pips-exporter";
import {PipsComponent} from "./pips-component";

export const PipsComponentName = Decorator.getValue(ComponentName, PipsComponentProps) as string;

export {PipsComponent};
export {PipsComponentProps};

export {PipsShape} from "./models/pips-shape";
export {PipsVariant} from "./variants";
export type {PipsExportProps as PipsProps} from "./models/pips-export-props";
export const Pips = new PipsExporter().export(PipsComponent);
