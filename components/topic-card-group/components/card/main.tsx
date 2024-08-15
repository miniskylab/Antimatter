import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {NavButton} from "@miniskylab/antimatter-nav-button";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {CardContext, Props} from "./models";

export function Component({
    style,
    text,
    ctas = [],
    isPlaceholderCard
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, text, ctas, isPlaceholderCard
    };

    const context = useComponentContext<CardContext>({props});

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
