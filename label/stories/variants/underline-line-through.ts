import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle} from "../../models";
import * as LabelVariant from "../../variants";

export const UnderlineLineThrough: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.Neutral,
        fontSize: 20,
        textDecorationLine: "underline line-through"
    };
};
