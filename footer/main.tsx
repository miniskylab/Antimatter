import {Label} from "@miniskylab/antimatter-label";
import React, {useMemo} from "react";
import {FooterContext, FooterProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Footer({
    id,
    style = Variant.Default,
    onReadyToUnmount,
    text
}: FooterProps): JSX.Element
{
    const props: Required<FooterProps> = {
        id, style, onReadyToUnmount, text
    };

    const context = useMemo<FooterContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <FooterContext.Provider value={context}>
            <Label style={computedStyle.Root}>{text}</Label>
        </FooterContext.Provider>
    );
}
