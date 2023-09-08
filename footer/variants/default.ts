import {Color} from "@miniskylab/antimatter-color-scheme";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {FooterStyle} from "../models";

const Footer__Root: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        width: "100%",
        minWidth: 300,
        lineHeight: 28,
        padding: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: Color.White,
        backgroundColor: Color.Background,
        textAlign: "center"
    };
};

export const Default: FooterStyle = function ()
{
    return {
        Root: Footer__Root
    };
};
