import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const BoldItalicUnderline: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.White,
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        textDecorationLine: "underline"
    };
};
