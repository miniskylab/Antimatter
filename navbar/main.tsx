import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {NavbarContext, NavbarProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Navbar({
    style = Variant.Default
}: NavbarProps): JSX.Element
{
    const props: Required<NavbarProps> = {
        style
    };

    const context = useMemo<NavbarContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <NavbarContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Icon} name={IconName.Sun}/>
                <Icon style={computedStyle.Icon} name={IconName.Sun}/>
                <Icon style={computedStyle.Icon} name={IconName.Sun}/>
                <Icon style={computedStyle.Icon} name={IconName.Sun}/>
                <Icon style={computedStyle.Icon} name={IconName.Sun}/>
                <Icon style={computedStyle.Icon} name={IconName.Menu}/>
            </View>
        </NavbarContext.Provider>
    );
}
