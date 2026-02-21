import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Small: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Blue,
        fontSize: 14,
        fontWeight: "bold"
    };
};
