import {useSuspense} from "@miniskylab/antimatter-typography";
import {ImageStyle} from "../models";

export const Default: ImageStyle = function ()
{
    return {
        ...useSuspense()
    };
};
