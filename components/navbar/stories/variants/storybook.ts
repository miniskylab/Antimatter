import type {ViewStyle} from "@miniskylab/antimatter-view";
import {NavbarContextHook} from "../../hooks";
import {type NavbarStyle} from "../../models";
import * as NavbarVariant from "../../variants";

const Navbar__Root: ViewStyle = function (viewProps)
{
    const navbarContext = NavbarContextHook.useNavbarContext();

    const inheritedStyle = NavbarVariant.Default(navbarContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        columnGap: 10,
        justifyContent: "center"
    };
};

export const Storybook: NavbarStyle = function (navbarProps)
{
    return {
        ...NavbarVariant.Default(navbarProps),
        Root: Navbar__Root
    };
};
