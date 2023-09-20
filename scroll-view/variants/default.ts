import {useSsrVisibleWhenReady} from "@miniskylab/antimatter-framework";
import {ScrollViewStyle} from "../models";

export const Default: ScrollViewStyle = function ()
{
    return {
        flex: 1,
        overscrollBehavior: "contain",
        ...useSsrVisibleWhenReady()
    };
};
