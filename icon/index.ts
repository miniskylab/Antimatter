import {ComponentName, Decorator} from "antimatter/infrastructures";
import {IconComponent} from "./icon-component";
import {IconComponentProps} from "./models/icon-component-props";
import {IconExporter} from "./models/icon-exporter";

export const IconComponentName = Decorator.getValue(ComponentName, IconComponentProps) as string;

export {IconComponent};
export {IconComponentProps};

export {IconName} from "./models/icon-name";
export {IconVariant} from "./variants";
export type {IconExportProps as IconProps} from "./models/icon-export-props";
export const Icon = new IconExporter().export(IconComponent);
