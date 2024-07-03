import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DropdownMenuContext, MenuItemKeyContext} from "../models";

export function useDropdownMenuContext(): NonNullable<DropdownMenuContext> { return useContextOrThrow(DropdownMenuContext); }

export function useMenuItemKeyContext(): NonNullable<MenuItemKeyContext> { return useContextOrThrow(MenuItemKeyContext); }
