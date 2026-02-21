import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const OutlinedRectangularBadge: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Gold,
        color: Color.White,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};
