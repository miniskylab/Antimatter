import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Italic: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Green,
        fontSize: 20,
        fontStyle: "italic"
    };
};
