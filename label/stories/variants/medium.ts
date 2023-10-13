import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const Medium: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Positive,
        fontSize: 30,
        fontWeight: "bold"
    };
};
