import {Color} from "@miniskylab/antimatter-color-scheme";
import {TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const OutlinedBadge: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 17,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Negative,
        color: Color.White,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};
