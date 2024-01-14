import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, EMPTY_STRING, Environment, Style} from "@miniskylab/antimatter-framework";
import {NavigationContainerRefContext, NavigationContext, useNavigation} from "@react-navigation/native";
import React, {JSX, useMemo} from "react";
import {Target} from "./enums";
import {NavButtonContext, NavButtonProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function NavButton({
    style = Variant.Default,
    destination,
    openIn = Target.SameWindowOrTab,
    label = EMPTY_STRING,
    icon,
    disabled = false
}: NavButtonProps): JSX.Element
{
    const props: AllPropertiesMustPresent<NavButtonProps> = {
        style, destination, openIn, label, icon, disabled
    };

    const context = useMemo<NavButtonContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);
    const navigationContext = React.useContext(NavigationContext);
    const navigationContainerRefContext = React.useContext(NavigationContainerRefContext);
    const clientSideNavigation = !Environment.is("Web") || navigationContext || navigationContainerRefContext ? useNavigation() : undefined;

    return (
        <NavButtonContext.Provider value={context}>
            <Button
                style={computedStyle}
                label={label}
                icon={icon}
                onPress={onPress}
                disabled={disabled}
            />
        </NavButtonContext.Provider>
    );

    function onPress(): void
    {
        if (clientSideNavigation)
        {
            clientSideNavigation.navigate({name: destination, params: {}} as never);
        }
        else if (Environment.is("WebBrowser"))
        {
            window.open(destination, openIn);
        }
    }
}
