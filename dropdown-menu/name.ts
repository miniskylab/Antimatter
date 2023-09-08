import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DropdownMenuProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DropdownMenuProps);
