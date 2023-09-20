import {useSsrVisibleWhenReady} from "@miniskylab/antimatter-framework";
import {ImageStyle} from "../models";

export const Default: ImageStyle = function ()
{
    return {
        ...useSsrVisibleWhenReady()
    };
};
