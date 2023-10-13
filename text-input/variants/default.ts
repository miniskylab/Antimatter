import {Environment} from "@miniskylab/antimatter-framework";
import {TextInputStyle} from "../models";

export const Default: TextInputStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "flex-start",
        ...Environment.useSuspense()
    };
};
