import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";

export const Medium: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Positive,
        fontSize: 30,
        fontWeight: "bold"
    };
};
