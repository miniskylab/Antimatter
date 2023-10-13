import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const WarningBadge: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 17,
        color: Color.White,
        backgroundColor: Color.Warning,
        fontSize: 20,
        fontWeight: "bold"
    };
};
