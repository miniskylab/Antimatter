import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {HeaderComponent} from "./header-component";
import {HeaderComponentProps} from "./models/header-component-props";
import {HeaderExporter} from "./models/header-exporter";

export const HeaderComponentName = Decorator.getValue(ComponentName, HeaderComponentProps) as string;

export {HeaderComponent};
export {HeaderComponentProps};

export {HeaderVariant} from "./variants";
export type {HeaderExportProps as HeaderProps} from "./models/header-export-props";
export const Header = new HeaderExporter().export(HeaderComponent);
