import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {DropDirection, MenuItemStatus} from "./enums";
import {DropdownMenuContext, DropdownMenuProps, MenuItemKeyContext} from "./models";
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
    const props: AllPropertiesMustPresent<DropdownMenuProps> = {
        style, menuItems, placeholder, isOpen, enableMenuHorizontalScrolling, dropDirection, onSelectedItemContainerPress, onMenuItemPress
    };

    const context = useMemo<DropdownMenuContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

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
                <Text key={index} style={computedStyle.SelectedItem} numberOfLines={1}>
                    {menuItems[selectedValue].displayText ?? selectedValue}
                </Text>
            ))
        );
    }

    function renderPlaceholder(): JSX.Element
    {
        return (<Text style={computedStyle.Placeholder}>{placeholder}</Text>);
    }

    function renderMenuItems(): JSX.Element[]
    {
        const menuItemJsxElements: JSX.Element[] = [];
        for (const menuItemKey in menuItems)
        {
            const menuItem = menuItems[menuItemKey];
            if (menuItem.status === MenuItemStatus.Hidden)
            {
                continue;
            }

            if (menuItem.status === MenuItemStatus.Divider)
            {
                menuItemJsxElements.push(<View key={menuItemKey} style={computedStyle.Divider}/>);
                continue;
            }

            menuItemJsxElements.push(
                <MenuItemKeyContext.Provider key={menuItemKey} value={menuItemKey}>
                    <Button
                        style={computedStyle.MenuItem}
                        label={menuItem.displayText || menuItemKey}
                        icon={menuItem.status === MenuItemStatus.Selected ? DefaultIconSet.CheckMark : undefined}
                        disabled={menuItem.status !== MenuItemStatus.Selected && menuItem.status !== undefined}
                        onPress={() => { onMenuItemPress?.(menuItemKey); }}
                    />
                </MenuItemKeyContext.Provider>
            );
        }

        return menuItemJsxElements;
    }
}
