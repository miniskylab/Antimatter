import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {NavButton} from "@miniskylab/antimatter-nav-button";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {CardContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    wysiwyg,
    ctas = [],
    thisIsPlaceholderCard
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, wysiwyg, ctas, thisIsPlaceholderCard
    };

    const context = useMemo<CardContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <CardContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.HorizontalMargin}/>
                <View style={computedStyle.Content}>
                    {wysiwyg && <Label style={computedStyle.Wysiwyg}>{wysiwyg}</Label>}
                    {ctas && ctas.length > 0 && (
                        <View style={computedStyle.CtaContainer}>
                            {ctas.map((cta, i) => (
                                <NavButton
                                    {...cta}
                                    key={i}
                                    style={cta.style ?? computedStyle.Cta}
                                />
                            ))}
                        </View>
                    )}
                </View>
                <View style={computedStyle.HorizontalMargin}/>
            </View>
        </CardContext.Provider>
    );
}
