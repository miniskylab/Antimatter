import {NavMenuContextHook, NavMenuStyle, NavMenuVariant} from "@miniskylab/antimatter-nav-menu";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";

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
