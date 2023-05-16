import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DropdownMenuProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DropdownMenuProps);
