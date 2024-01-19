import {useSuspense} from "@miniskylab/antimatter-framework";
import {PressableStyle} from "../models";

export const Default: PressableStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSuspense()
    };
};
