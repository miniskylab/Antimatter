import {useSuspense} from "@miniskylab/antimatter-typography";
import {PressableStyle} from "../models";

export const Default: PressableStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSuspense()
    };
};
