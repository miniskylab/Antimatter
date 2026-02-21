import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Medium: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Green,
        fontSize: 30,
        fontWeight: "bold"
    };
};
