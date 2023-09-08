import {useContext} from "react";
import {DropdownMenuContext, MenuItemContext} from "../models";

export function useDropdownMenuContext(): DropdownMenuContext { return useContext(DropdownMenuContext); }

export function useMenuItemContext(): MenuItemContext { return useContext(MenuItemContext); }
