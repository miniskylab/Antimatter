import {Style} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import React, {JSX, useMemo} from "react";
import {FooterContext, FooterProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Footer({
    style = Variant.Default,
    text
}: FooterProps): JSX.Element
{
    const props: Required<FooterProps> = {
        style, text
    };

    const context = useMemo<FooterContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <FooterContext.Provider value={context}>
            <Label style={computedStyle.Root}>{text}</Label>
        </FooterContext.Provider>
    );
}
