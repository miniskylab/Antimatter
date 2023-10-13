import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const Small: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Primary,
        fontSize: 14,
        fontWeight: "bold"
    };
};
