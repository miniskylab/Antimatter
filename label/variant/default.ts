import {LabelStyle} from "../model";

export const Default: LabelStyle = function ()
{
    const labelStyle: ReturnType<LabelStyle> = {};

    labelStyle.Root = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return labelStyle;
};
