import {Button} from "@miniskylab/antimatter-button";
import {Label} from "@miniskylab/antimatter-label";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import React, {JSX, useMemo} from "react";
import {NavMenuContext, NavMenuProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function NavMenu({
    style = Variant.Default,
    selectedUrl,
    categories = [],
    onMenuItemPress
}: NavMenuProps): JSX.Element
{
    const props: Required<NavMenuProps> = {
        style, selectedUrl, categories, onMenuItemPress
    };

    const context = useMemo<NavMenuContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <NavMenuContext.Provider value={context}>
            <ScrollView style={computedStyle.Root} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {categories.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                        <Label style={computedStyle.Category}>{category.label}</Label>
                        {category.menuItems?.map((menuItem, menuItemIndex) => (
                            <Button
                                key={menuItemIndex}
                                style={computedStyle.Link}
                                icon={menuItem.icon}
                                label={menuItem.label}
                                disabled={menuItem.url === selectedUrl}
                                onPress={() => { onMenuItemPress?.(menuItem.url); }}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </ScrollView>
        </NavMenuContext.Provider>
    );
}
