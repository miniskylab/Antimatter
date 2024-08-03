import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DropdownMenuProps} from "./props";

export const DropdownMenuContext = createContext<DropdownMenuContext>(undefined);
export type DropdownMenuContext = ComponentContext<DropdownMenuProps>;

export const MenuItemKeyContext = createContext<MenuItemKeyContext>(undefined);
export type MenuItemKeyContext = string | undefined;
