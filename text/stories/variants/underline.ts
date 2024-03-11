import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Underline: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Warning,
        fontSize: 20,
        textDecorationLine: "underline"
    };
};
