import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";

export const UnderlineLineThrough: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Neutral,
        fontSize: 20,
        textDecorationLine: "underline line-through"
    };
};
