import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {DropdownMenuComponent} from "./dropdown-menu-component";
import {DropdownMenuComponentProps} from "./models/dropdown-menu-component-props";
import {DropdownMenuExporter} from "./models/dropdown-menu-exporter";

export const DropdownMenuComponentName = Decorator.getValue<string>(ComponentName, DropdownMenuComponentProps);

export {DropdownMenuComponent};
export {DropdownMenuComponentProps};

export {DropdownMenuVariant} from "./variants";
export type {DropdownMenuExportProps as DropdownMenuProps} from "./models/dropdown-menu-export-props";
export const DropdownMenu = new DropdownMenuExporter().export(DropdownMenuComponent);
