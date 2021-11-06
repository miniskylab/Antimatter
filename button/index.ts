import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {ButtonComponent} from "./button-component";
import {ButtonComponentProps} from "./models/button-component-props";
import {ButtonExporter} from "./models/button-exporter";

export const ButtonComponentName = Decorator.getValue<string>(ComponentName, ButtonComponentProps);

export {ButtonComponent};
export {ButtonComponentProps};

export {ButtonVariant} from "./variants";
export {ButtonTarget} from "./models/button-target";
export type {ButtonExportProps as ButtonProps} from "./models/button-export-props";
export const Button = new ButtonExporter().export(ButtonComponent);
