import {Color} from "@miniskylab/antimatter-color-scheme";
import {useSuspense} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "../models";

export const Default: LabelStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        color: Color.White,
        ...useSuspense()
    };
};
