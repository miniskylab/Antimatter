import {useSuspense} from "@miniskylab/antimatter-typography";
import {TextInputStyle} from "../models";

export const Default: TextInputStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "flex-start",
        ...useSuspense()
    };
};
