import {useSuspense} from "@miniskylab/antimatter-framework";
import {type ScrollViewStyle} from "../models";

export const Default: ScrollViewStyle = function ()
{
    return {
        flex: 1,
        overscrollBehavior: "contain",
        ...useSuspense()
    };
};
