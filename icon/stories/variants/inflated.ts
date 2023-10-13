import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle} from "../../models";
import * as IconVariant from "../../variants";

export const Inflated: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        color: Color.White,
        fontSize: 60
    };
};
