import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const GoldBadge: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 17,
        color: Color.White,
        backgroundColor: Color.Gold,
        fontSize: 20,
        fontWeight: "bold"
    };
};
