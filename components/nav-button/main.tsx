import {Button} from "@miniskylab/antimatter-button";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isEnvironment,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {NavigationContainerRefContext, NavigationContext, useNavigation} from "@react-navigation/native";
import React, {JSX, useContext} from "react";
import {Target} from "./enums";
import {NavButtonContext, NavButtonProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that users can press to navigate to a different location within a system.
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

    const navigationContext = useContext(NavigationContext);
    const navigationContainerRefContext = useContext(NavigationContainerRefContext);
    const clientSideNavigation = !isEnvironment("Web") || navigationContext || navigationContainerRefContext ? useNavigation() : undefined;

    const context = useComponentContext<NavButtonContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

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
        else if (isEnvironment("WebBrowser"))
        {
            window.open(destination, openIn);
        }
    }
}
