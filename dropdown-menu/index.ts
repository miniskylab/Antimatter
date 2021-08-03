import {ComponentName, Decorator} from "antimatter/infrastructures";
import {DropdownMenuComponent} from "./dropdown-menu-component";
import {DropdownMenuComponentProps} from "./models/dropdown-menu-component-props";
import {DropdownMenuExporter} from "./models/dropdown-menu-exporter";

export const DropdownMenuComponentName = Decorator.getValue(ComponentName, DropdownMenuComponentProps) as string;

export {DropdownMenuComponent};
export {DropdownMenuComponentProps};

export {DropdownMenuVariant} from "./variants";
export type {DropdownMenuExportProps as DropdownMenuProps} from "./models/dropdown-menu-export-props";
export const DropdownMenu = new DropdownMenuExporter().export(DropdownMenuComponent);
