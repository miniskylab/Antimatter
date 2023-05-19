import {Button} from "@miniskylab/antimatter-button";
import {EMPTY_STRING} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {DropDirection, MenuItemStatus} from "./enum";
import {DropdownMenuContext, DropdownMenuProps, MenuItemContext} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function DropdownMenu({
    style = Variant.Default,
    menuItems = {},
    placeholder = EMPTY_STRING,
    isOpen = false,
    dropDirection = DropDirection.Down,
    onDropdownMenuPress,
    onMenuItemPress
}: DropdownMenuProps): JSX.Element
{
    const props: Required<DropdownMenuProps> = {
        style, menuItems, placeholder, isOpen, dropDirection, onDropdownMenuPress, onMenuItemPress
    };

    const context = useMemo<DropdownMenuContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    const selectedValues = Object.keys(menuItems).filter(x => menuItems[x].status === MenuItemStatus.Selected);
    const hasSelection = selectedValues.length > 0;

    return (
        <DropdownMenuContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={onDropdownMenuPress}>
                <View style={computedStyle.SelectedItemContainer}>
                    {hasSelection ? renderSelectedItems() : renderPlaceholder()}
                </View>
                <View style={computedStyle.Caret}/>
                <View style={computedStyle.Menu} pointerEvents={"box-none"}>
                    {renderMenuItems()}
                </View>
            </Pressable>
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
