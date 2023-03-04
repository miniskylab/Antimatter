import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {FooterProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Footer({
    style = Variant.Default,
    text
}: FooterProps): JSX.Element
{
    const {style: _, ...propsWithoutStyle} = arguments[0] as FooterProps;
    const Style = style(propsWithoutStyle);

    return (
        <Label style={Style.Root}>{text}</Label>
    );
}
