import {Color} from "@miniskylab/antimatter-color-scheme";
import {type TextStyle} from "../../models";
import * as TextVariant from "../../variants";

export const TomatoBadge: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 17,
        color: Color.White,
        backgroundColor: Color.Tomato,
        fontSize: 20,
        fontWeight: "bold"
    };
};
