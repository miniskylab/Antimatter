import {ViewVariant} from "@miniskylab/antimatter-view";
import {TransitionStyle} from "../models";

export const Default: TransitionStyle = function ()
{
    return function (viewProps)
    {
        return {
            ...ViewVariant.Default(viewProps),
            overflow: "hidden"
        };
    };
};
