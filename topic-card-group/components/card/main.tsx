import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Image} from "@miniskylab/antimatter-image";
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
    title,
    illustration,
    description,
    ctas = [],
    thisIsPlaceholderCard
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, title, illustration, description, ctas, thisIsPlaceholderCard
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
                    {illustration?.type === "icon" && <Icon style={computedStyle.Icon} name={illustration.iconName} selectable={false}/>}
                    {illustration?.type === "image" && (
                        <Image
                            style={computedStyle.Image}
                            source={illustration.source}
                            alt={illustration.alt}
                        />
                    )}
                    {title && <Label style={computedStyle.Title}>{title}</Label>}
                    {description && <Label style={computedStyle.Description}>{description}</Label>}
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
