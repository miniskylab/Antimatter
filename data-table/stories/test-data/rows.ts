import {DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {DataTableProps} from "../../models";
import {MenuItems} from "./menu-items";

export const Rows: DataTableProps["rows"] = {
    "1": ["Porttitor", "porttitor", deepCopyWithSelection(MenuItems, "scelerisque"), true],
    "2": ["Malesuada", "malesuada", deepCopyWithSelection(MenuItems, "ullamcorper"), true],
    "3": ["Adipiscing", "adipiscing", deepCopyWithSelection(MenuItems, "viverra"), true],
    "4": ["Volutpat", "volutpat", deepCopyWithSelection(MenuItems, "neque"), false],
    "5": ["Laoreet", "laoreet", deepCopyWithSelection(MenuItems, "elementum"), false],
    "6": ["Fringilla", "fringilla", deepCopyWithSelection(MenuItems, "curabitur"), true],
    "7": ["Dignissim", "dignissim", deepCopyWithSelection(MenuItems, "pulvinar"), false],
    "8": ["Phasellus", "phasellus ", deepCopyWithSelection(MenuItems, "imperdiet"), false],
    "9": ["Consequat", "consequat", deepCopyWithSelection(MenuItems, "feugiat"), false],
    "10": ["Egestas", "egestas", deepCopyWithSelection(MenuItems, "pharetra"), false],
    "11": ["Ornare", "ornare", deepCopyWithSelection(MenuItems, "ullamcorper"), false],
    "12": ["Morbi", "morbi", deepCopyWithSelection(MenuItems, "curabitur"), false],
    "13": ["Ultrices", "ultrices", deepCopyWithSelection(MenuItems, "pharetra"), false],
    "14": ["Posuere", "posuere", deepCopyWithSelection(MenuItems, "imperdiet"), false],
    "15": ["Sagittis", "sagittis", deepCopyWithSelection(MenuItems, "scelerisque"), false],
    "16": ["Sollicitudin", "sollicitudin", deepCopyWithSelection(MenuItems, "elementum"), false],
    "17": ["Scelerisque", "scelerisque", deepCopyWithSelection(MenuItems, "neque"), false],
    "18": ["Aliquam", "aliquam", deepCopyWithSelection(MenuItems, "feugiat"), false],
    "19": ["Gravida", "gravida", deepCopyWithSelection(MenuItems, "viverra"), false],
    "20": ["Vulputate", "vulputate", deepCopyWithSelection(MenuItems, "pulvinar"), false]
};

function deepCopyWithSelection(
    menuItems: DropdownMenuProps["menuItems"],
    ...selections: string[]
): DropdownMenuProps["menuItems"]
{
    const copy = {...menuItems};
    selections.forEach(selection =>
    {
        copy[selection] = {
            ...copy[selection],
            status: MenuItemStatus.Selected
        };
    });

    return copy;
}
