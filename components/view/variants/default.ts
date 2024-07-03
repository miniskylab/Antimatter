import {useSuspense} from "@miniskylab/antimatter-framework";
import {type ViewStyle} from "../models";

export const Default: ViewStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSuspense()
    };
};
