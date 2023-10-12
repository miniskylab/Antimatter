import {DataTableProps} from "@miniskylab/antimatter-data-table";
import {DropdownMenuProps, MenuItemStatus} from "@miniskylab/antimatter-dropdown-menu";
import {menuItems} from "./menu-items";

export const rows: DataTableProps["rows"] = {
    "1": ["Porttitor", "porttitor", deepCopyWithSelection(menuItems, "scelerisque"), true],
    "2": ["Malesuada", "malesuada", deepCopyWithSelection(menuItems, "ullamcorper"), true],
    "3": ["Adipiscing", "adipiscing", deepCopyWithSelection(menuItems, "viverra"), true],
    "4": ["Volutpat", "volutpat", deepCopyWithSelection(menuItems, "neque"), false],
    "5": ["Laoreet", "laoreet", deepCopyWithSelection(menuItems, "elementum"), false],
    "6": ["Fringilla", "fringilla", deepCopyWithSelection(menuItems, "curabitur"), true],
    "7": ["Dignissim", "dignissim", deepCopyWithSelection(menuItems, "pulvinar"), false],
    "8": ["Phasellus", "phasellus ", deepCopyWithSelection(menuItems, "imperdiet"), false],
    "9": ["Consequat", "consequat", deepCopyWithSelection(menuItems, "feugiat"), false],
    "10": ["Egestas", "egestas", deepCopyWithSelection(menuItems, "pharetra"), false],
    "11": ["Ornare", "ornare", deepCopyWithSelection(menuItems, "ullamcorper"), false],
    "12": ["Morbi", "morbi", deepCopyWithSelection(menuItems, "curabitur"), false],
    "13": ["Ultrices", "ultrices", deepCopyWithSelection(menuItems, "pharetra"), false],
    "14": ["Posuere", "posuere", deepCopyWithSelection(menuItems, "imperdiet"), false],
    "15": ["Sagittis", "sagittis", deepCopyWithSelection(menuItems, "scelerisque"), false],
    "16": ["Sollicitudin", "sollicitudin", deepCopyWithSelection(menuItems, "elementum"), false],
    "17": ["Scelerisque", "scelerisque", deepCopyWithSelection(menuItems, "neque"), false],
    "18": ["Aliquam", "aliquam", deepCopyWithSelection(menuItems, "feugiat"), false],
    "19": ["Gravida", "gravida", deepCopyWithSelection(menuItems, "viverra"), false],
    "20": ["Vulputate", "vulputate", deepCopyWithSelection(menuItems, "pulvinar"), false]
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
