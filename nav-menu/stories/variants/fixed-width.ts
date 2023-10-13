import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {NavMenuContextHook} from "../../hooks";
import {NavMenuStyle} from "../../models";
import * as NavMenuVariant from "../../variants";

const NavMenu__Root: ScrollViewStyle = function (scrollViewProps)
{
    const navMenuContext = NavMenuContextHook.useNavMenuContext();

    const inheritedStyle = NavMenuVariant.Default(navMenuContext.props).Root(scrollViewProps);

    return {
        ...inheritedStyle,
        flex: 0
    };
};

export const FixedWidth: NavMenuStyle = function (navMenuProps)
{
    return {
        ...NavMenuVariant.Default(navMenuProps),
        Root: NavMenu__Root
    };
};
