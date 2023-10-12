import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";

export const RectangularBadge: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingVertical: 9,
        paddingHorizontal: 18,
        color: Color.White,
        backgroundColor: Color.Primary,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "top"
    };
};
