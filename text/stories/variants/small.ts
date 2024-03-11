import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const Small: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        color: Color.Primary,
        fontSize: 14,
        fontWeight: "bold"
    };
};
