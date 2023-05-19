import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../model";

export const Default: LabelStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        color: Color.White
    };
};
