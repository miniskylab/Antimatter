import {TransitionStyle} from "../model";

export const Default: TransitionStyle = function ()
{
    const transitionStyle: ReturnType<TransitionStyle> = {};

    transitionStyle.Root = {
        overflow: "hidden"
    };

    return transitionStyle;
};
