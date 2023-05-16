import {ViewVariant} from "@miniskylab/antimatter-view";
import {TransitionStyle} from "../model";

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
