import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Large: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Gold,
        fontSize: 40,
        fontWeight: "bold"
    };
};
