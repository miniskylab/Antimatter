import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {NavbarStyle} from "../models";

const Navbar__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        columnGap: 40,
        width: "100%",
        height: 50,
        backgroundColor: Color.Ambient,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        shadowColor: Color.White__a10,
        shadowOpacity: 1
    };
};

const Navbar__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 30,
        fontSize: 22,
        color: Color.White
    };
};

export const Default: NavbarStyle = function ()
{
    return {
        Root: Navbar__Root,
        Icon: Navbar__Icon
    };
};
