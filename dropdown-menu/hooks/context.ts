import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DropdownMenuContext, MenuItemContext} from "../models";

export function useDropdownMenuContext(): NonNullable<DropdownMenuContext> { return useContextOrThrow(DropdownMenuContext); }

export function useMenuItemContext(): NonNullable<MenuItemContext> { return useContextOrThrow(MenuItemContext); }
