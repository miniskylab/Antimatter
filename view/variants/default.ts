import {Environment} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "../models";

export const Default: ViewStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...Environment.useSuspense()
    };
};
