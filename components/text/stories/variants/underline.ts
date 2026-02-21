import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Underline: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Gold,
        fontSize: 20,
        textDecorationLine: "underline"
    };
};
