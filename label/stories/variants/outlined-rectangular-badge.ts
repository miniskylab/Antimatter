import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const OutlinedRectangularBadge: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Warning,
        color: Color.White,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};