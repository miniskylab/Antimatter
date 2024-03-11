import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const LineThrough: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Negative,
        fontSize: 20,
        textDecorationLine: "line-through"
    };
};
