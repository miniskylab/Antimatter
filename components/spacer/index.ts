import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {SpacerComponentProps} from "./models/spacer-component-props";
import {SpacerExporter} from "./models/spacer-exporter";
import {SpacerComponent} from "./spacer-component";

export const SpacerComponentName = Decorator.getValue<string>(ComponentName, SpacerComponentProps);

export {SpacerComponent};
export {SpacerComponentProps};

export {SpacerVariant} from "./variants";
export type {SpacerExportProps as SpacerProps} from "./models/spacer-export-props";
export const Spacer = new SpacerExporter().export(SpacerComponent);
