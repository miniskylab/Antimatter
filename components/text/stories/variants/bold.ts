import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Bold: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Primary,
        fontSize: 20,
        fontWeight: "bold"
    };
};
