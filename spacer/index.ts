import {ComponentName, Decorator} from "antimatter/infrastructures";
import {SpacerComponentProps} from "./models/spacer-component-props";
import {SpacerExporter} from "./models/spacer-exporter";
import {SpacerComponent} from "./spacer-component";

export const SpacerComponentName = Decorator.getValue(ComponentName, SpacerComponentProps) as string;

export {SpacerComponent};
export {SpacerComponentProps};

export {SpacerVariant} from "./variants";
export type {SpacerExportProps as SpacerProps} from "./models/spacer-export-props";
export const Spacer = new SpacerExporter().export(SpacerComponent);
