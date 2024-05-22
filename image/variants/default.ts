import {useSuspense} from "@miniskylab/antimatter-framework";
import {type ImageStyle} from "../models";

export const Default: ImageStyle = function ()
{
    return {
        ...useSuspense()
    };
};
