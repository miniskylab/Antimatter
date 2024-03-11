import {Color} from "@miniskylab/antimatter-color-scheme";
import {useSuspense} from "@miniskylab/antimatter-framework";
import {TextStyle} from "../models";

export const Default: TextStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        color: Color.White,
        ...useSuspense()
    };
};
