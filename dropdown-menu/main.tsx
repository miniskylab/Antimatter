import {Button} from "@miniskylab/antimatter-button";
import {EMPTY_STRING, useComputedStyle} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {DropDirection, MenuItemStatus} from "./enums";
import {DropdownMenuContext, DropdownMenuProps, MenuItemContext} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function DropdownMenu({
    style = Variant.Default,
    menuItems = {},
    placeholder = EMPTY_STRING,
    isOpen = false,
    enableMenuHorizontalScrolling = false,
    dropDirection = DropDirection.Down,
    onSelectedItemContainerPress,
    onMenuItemPress
}: DropdownMenuProps): JSX.Element
{
    const props: Required<DropdownMenuProps> = {
        style, menuItems, placeholder, isOpen, enableMenuHorizontalScrolling, dropDirection, onSelectedItemContainerPress, onMenuItemPress
    };

    const context = useMemo<DropdownMenuContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = useComputedStyle(style, props);

    const selectedValues = Object.keys(menuItems).filter(x => menuItems[x].status === MenuItemStatus.Selected);
    const hasSelection = selectedValues.length > 0;

    return (
        <DropdownMenuContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Pressable style={computedStyle.SelectedItemContainer} onPress={onSelectedItemContainerPress}>
                    {hasSelection ? renderSelectedItems() : renderPlaceholder()}
                    <View style={computedStyle.Caret}/>
                </Pressable>
                <ScrollView
                    style={computedStyle.Menu}
                    horizontal={enableMenuHorizontalScrolling}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {renderMenuItems()}
                </ScrollView>
            </View>
        </DropdownMenuContext.Provider>
    );

    function renderSelectedItems(): JSX.Element[]
    {
        return (
            selectedValues.map((selectedValue, index) => (
                <Label key={index} style={computedStyle.SelectedItem} numberOfLines={1}>
                    {menuItems[selectedValue].displayText ?? selectedValue}
                </Label>
            ))
        );
    }

    function renderPlaceholder(): JSX.Element
    {
        return (<Label style={computedStyle.Placeholder}>{placeholder}</Label>);
    }

    function renderMenuItems(): JSX.Element[]
    {
        const menuItemJsxElements: JSX.Element[] = [];
        for (const menuItemKey in menuItems)
        {
            const menuItem = menuItems[menuItemKey];
            if (menuItem.status === MenuItemStatus.Divider)
            {
                menuItemJsxElements.push(<View key={menuItemKey} style={computedStyle.Divider}/>);
                continue;
            }

            menuItemJsxElements.push(
                <MenuItemContext.Provider key={menuItemKey} value={menuItem}>
                    <Button
                        style={computedStyle.MenuItem}
                        label={menuItem.displayText || menuItemKey}
                        icon={menuItem.status === MenuItemStatus.Selected && IconName.CheckMark}
                        disabled={menuItem.status !== MenuItemStatus.Selected && menuItem.status !== undefined}
                        onPress={() => { onMenuItemPress?.(menuItemKey); }}
                    />
                </MenuItemContext.Provider>
            );
        }

        return menuItemJsxElements;
    }
}
