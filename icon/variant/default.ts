import {IconStyle} from "../model";

export const Default: IconStyle = function ()
{
    const iconStyle: ReturnType<IconStyle> = {};

    iconStyle.Root = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return iconStyle;
};
