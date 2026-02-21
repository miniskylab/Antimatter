import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const LineThrough: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Tomato,
        fontSize: 20,
        textDecorationLine: "line-through"
    };
};
