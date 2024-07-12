import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {DropDirection, MenuItemStatus} from "../enums";
import {DropdownMenu} from "../main";
import {DropdownMenuProps} from "../models";
import * as Variant from "../variants";

const DropdownMenuWithValidation = withValidation(DropdownMenu, DropdownMenuProps);
export default {
    component: DropdownMenu,
    title: "Components/Dropdown Menu",
    render: (args: Required<DropdownMenuProps>) =>
    {
        const [, setArgs] = useArgs<DropdownMenuProps>();
        return (
            <DropdownMenuWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onSelectedItemContainerPress={() => { setArgs({isOpen: !args.isOpen}); }}
                onMenuItemPress={pressedMenuItemKey =>
                {
                    const newMenuItems: DropdownMenuProps["menuItems"] = {};
                    Object.keys(args.menuItems).forEach(menuItemKey =>
                    {
                        const oldMenuItem = args.menuItems[menuItemKey];
                        newMenuItems[menuItemKey] = {
                            ...oldMenuItem,
                            status: menuItemKey !== pressedMenuItemKey
                                ? oldMenuItem.status
                                : oldMenuItem.status === MenuItemStatus.Selected
                                    ? undefined
                                    : oldMenuItem.status === undefined
                                        ? MenuItemStatus.Selected
                                        : oldMenuItem.status
                        };
                    });

                    setArgs({menuItems: newMenuItems});
                }}
            />
        );
    }
} satisfies Meta<typeof DropdownMenu>;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
    decorators: [Story => <div style={{display: "flex", alignItems: "center", height: 570}}>{<Story/>}</div>],
    argTypes: {
        style: Sb.styleSelector(Variant),
        placeholder: Sb.text(),
        dropDirection: Sb.enumDropdown(DropDirection),
        isOpen: Sb.boolean(),
        enableMenuHorizontalScrolling: Sb.boolean(),
        menuItems: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        placeholder: "Please select some options",
        dropDirection: DropDirection.Down,
        isOpen: false,
        enableMenuHorizontalScrolling: false,
        menuItems: {
            "alpha": {displayText: "Alpha"},
            "beta": {displayText: "Beta"},
            "gamma": {displayText: "Gamma"},
            "hidden-1": {displayText: "Hidden 1", status: MenuItemStatus.Hidden},
            "omega": {displayText: "Omega"},
            "charlie": {displayText: "Charlie"},
            "long-text": {displayText: "This is a very very long line of text"},
            "hidden-2": {displayText: "Hidden 2", status: MenuItemStatus.Hidden}
        }
    }
};

export const Divider: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        placeholder: "Please select some options",
        menuItems: {
            "alpha": {displayText: "Alpha"},
            "beta": {displayText: "Beta"},
            "gamma": {displayText: "Gamma"},
            "divider-1": {status: MenuItemStatus.Divider},
            "omega": {displayText: "Omega"},
            "charlie": {displayText: "Charlie"},
            "divider-2": {status: MenuItemStatus.Divider},
            "lambda": {displayText: "Lambda"}
        }
    }
};

export const DisabledOptions: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        placeholder: "Please select some options",
        menuItems: {
            "alpha": {displayText: "Alpha"},
            "beta": {displayText: "Beta"},
            "gamma": {displayText: "Gamma", status: MenuItemStatus.Disabled},
            "omega": {displayText: "Omega"},
            "charlie": {displayText: "Charlie", status: MenuItemStatus.Disabled},
            "lambda": {displayText: "Lambda"}
        }
    }
};

export const Dropup: Story = {
    tags: ["hidden-from-sidebar"],
    decorators: [Story => <div style={{display: "flex", alignItems: "flex-end", height: 285}}>{<Story/>}</div>],
    args: {
        style: Variant.Default,
        placeholder: "Please select some options",
        dropDirection: DropDirection.Up,
        menuItems: {
            "alpha": {displayText: "Alpha"},
            "beta": {displayText: "Beta"},
            "gamma": {displayText: "Gamma"},
            "omega": {displayText: "Omega"},
            "charlie": {displayText: "Charlie"},
            "lambda": {displayText: "Lambda"}
        }
    }
};

export const PreSelected: Story = {
    tags: ["hidden-from-sidebar"],
    args: {
        style: Variant.Default,
        placeholder: "Please select some options",
        menuItems: {
            "alpha": {displayText: "Alpha"},
            "beta": {displayText: "Beta"},
            "gamma": {displayText: "Gamma", status: MenuItemStatus.Selected},
            "omega": {displayText: "Omega"},
            "charlie": {displayText: "Charlie"},
            "lambda": {displayText: "Lambda"}
        }
    }
};
