import {IconStyle} from "../model";

export const Default: IconStyle = function ()
{
    const iconStyle: ReturnType<typeof Default> = {};

    iconStyle.Root = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return iconStyle;
};
