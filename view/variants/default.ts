import {useSuspense} from "@miniskylab/antimatter-typography";
import {ViewStyle} from "../models";

export const Default: ViewStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSuspense()
    };
};
