import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import React, {JSX, useMemo} from "react";
import {NavMenuContext, NavMenuProps} from "./models";
import * as Variant from "./variants";

/**
 * An organized list of URLs to different locations within a system.
 */
export function NavMenu({
    style = Variant.Default,
    selectedUrl,
    categories = [],
    onMenuItemPress
}: NavMenuProps): JSX.Element
{
    const props: AllPropertiesMustPresent<NavMenuProps> = {
        style, selectedUrl, categories, onMenuItemPress
    };

    const context = useMemo<NavMenuContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <NavMenuContext.Provider value={context}>
            <ScrollView style={computedStyle.Root} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {categories.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                        <Text style={computedStyle.Category}>{category.label}</Text>
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
