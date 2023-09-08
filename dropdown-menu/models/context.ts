import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {MenuItem} from "../types";
import {DropdownMenuProps} from "./props";

export const DropdownMenuContext = createContext<DropdownMenuContext>({});
export type DropdownMenuContext = ComponentContext<DropdownMenuProps>;

export const MenuItemContext = createContext<MenuItemContext>(undefined);
export type MenuItemContext = MenuItem;
