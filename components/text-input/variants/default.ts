import {useSuspense} from "@miniskylab/antimatter-framework";
import {type TextInputStyle} from "../models";

export const Default: TextInputStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "flex-start",
        ...useSuspense()
    };
};
