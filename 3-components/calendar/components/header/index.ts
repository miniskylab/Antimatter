import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {HeaderComponent} from "./header-component";
import {HeaderComponentProps} from "./models/header-component-props";
import {HeaderExporter} from "./models/header-exporter";

export const HeaderComponentName = Decorator.getValue<string>(ComponentName, HeaderComponentProps);

export {HeaderComponent};
export {HeaderComponentProps};

export {HeaderVariant} from "./variants";
export type {HeaderExportProps as HeaderProps} from "./models/header-export-props";
export const Header = new HeaderExporter().export(HeaderComponent);
