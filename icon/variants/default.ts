import {useSsrVisibleWhenReady} from "@miniskylab/antimatter-framework";
import {IconStyle} from "../models";

export const Default: IconStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSsrVisibleWhenReady()
    };
};
