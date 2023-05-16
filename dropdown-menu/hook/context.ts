import {useContext} from "react";
import {DropdownMenuContext, MenuItemContext} from "../model";

export function useDropdownMenuContext(): DropdownMenuContext { return useContext(DropdownMenuContext); }

export function useMenuItemContext(): MenuItemContext { return useContext(MenuItemContext); }
