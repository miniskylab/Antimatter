import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {IconComponent} from "./icon-component";
import {IconComponentProps} from "./models/icon-component-props";
import {IconExporter} from "./models/icon-exporter";

export const IconComponentName = Decorator.getValue<string>(ComponentName, IconComponentProps);

export {IconComponent};
export {IconComponentProps};

export {IconName} from "./models/icon-name";
export {IconVariant} from "./variants";
export type {IconExportProps as IconProps} from "./models/icon-export-props";
export const Icon = new IconExporter().export(IconComponent);
