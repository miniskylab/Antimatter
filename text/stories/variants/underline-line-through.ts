import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const UnderlineLineThrough: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Neutral,
        fontSize: 20,
        textDecorationLine: "underline line-through"
    };
};
