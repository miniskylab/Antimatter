import {LabelStyle} from "../model";

export const Default: LabelStyle = function ()
{
    const labelStyle: ReturnType<typeof Default> = {};

    labelStyle.Root = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    return labelStyle;
};
