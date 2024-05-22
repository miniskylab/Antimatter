import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const RectangularBadge: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingVertical: 9,
        paddingHorizontal: 18,
        color: Color.White,
        backgroundColor: Color.Primary,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};
