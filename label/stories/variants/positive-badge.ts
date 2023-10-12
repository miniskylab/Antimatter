import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";

export const PositiveBadge: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 17,
        color: Color.White,
        backgroundColor: Color.Positive,
        fontSize: 20,
        fontWeight: "bold"
    };
};
