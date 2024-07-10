import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {NavButton} from "@miniskylab/antimatter-nav-button";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {CardContext, Props} from "./models";

/**
 * A component that displays content and actions about a single subject.
 */
export function Component({
    style,
    text,
    ctas = [],
    thisIsPlaceholderCard
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, text, ctas, thisIsPlaceholderCard
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
                    {text && <Text style={computedStyle.Text}>{text}</Text>}
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
