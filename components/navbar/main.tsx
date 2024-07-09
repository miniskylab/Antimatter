import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {NavButton} from "@miniskylab/antimatter-nav-button";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {NavbarContext, NavbarProps} from "./models";
import * as Variant from "./variants";

/**
 * A long, narrow, horizontal area on screen that contains navigation buttons that users can press to navigate to different locations within
 * a system.
 */
export function Navbar({
    style = Variant.Default,
    tabs = []
}: NavbarProps): JSX.Element
{
    const props: AllPropertiesMustPresent<NavbarProps> = {
        style, tabs
    };

    const context = useMemo<NavbarContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <NavbarContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {tabs.map((tab, tabIndex) => <NavButton key={tabIndex} style={computedStyle.Tab} {...tab} />)}
            </View>
        </NavbarContext.Provider>
    );
}
