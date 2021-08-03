import {ComponentName, Decorator} from "antimatter/infrastructures";
import {TransitionComponentProps} from "./models/transition-component-props";
import {TransitionExporter} from "./models/transition-exporter";
import {TransitionComponent} from "./transition-component";

export const TransitionComponentName = Decorator.getValue(ComponentName, TransitionComponentProps) as string;

export {TransitionComponent};
export {TransitionComponentProps};

export {TransitionVariant} from "./variants";
export type {TransitionExportProps as TransitionProps} from "./models/transition-export-props";
export const Transition = new TransitionExporter().export(TransitionComponent);
