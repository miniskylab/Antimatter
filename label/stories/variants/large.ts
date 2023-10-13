import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const Large: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Warning,
        fontSize: 40,
        fontWeight: "bold"
    };
};
