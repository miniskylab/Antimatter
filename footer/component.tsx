import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {FooterProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Footer({
    className,
    text
}: FooterProps): JSX.Element
{
    return (
        <Label className={className} text={text}/>
    );
}
