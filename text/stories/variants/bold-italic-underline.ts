import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const BoldItalicUnderline: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.White,
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        textDecorationLine: "underline"
    };
};
