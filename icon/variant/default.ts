import {IconStyle} from "../model";

export const Default: IconStyle = function ()
{
    const iconStyle: ReturnType<typeof Default> = {};

    iconStyle.Root = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    return iconStyle;
};
