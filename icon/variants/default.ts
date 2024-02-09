import {useSuspenseUntilTypographyIsLoaded} from "@miniskylab/antimatter-typography";
import {IconStyle} from "../models";

export const Default: IconStyle = function ()
{
    return {
        alignItems: "center",
        justifyContent: "center",
        ...useSuspenseUntilTypographyIsLoaded()
    };
};
