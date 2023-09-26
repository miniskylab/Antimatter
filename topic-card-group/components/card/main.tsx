import {Button} from "@miniskylab/antimatter-button";
import {Environment, useComputedStyle, useEnvironment} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Image} from "@miniskylab/antimatter-image";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Linking} from "react-native";
import {CardContext, CtaTargetContext, Props} from "./models";
import {Cta} from "./types";

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
    const props: Required<Props> = {
        style, title, illustration, description, ctas, thisIsPlaceholderCard
    };

    const context = useMemo<CardContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = useComputedStyle(style, props);
    const runningInsideWebBrowser = useEnvironment(Environment.WebBrowser);

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
                                <CtaTargetContext.Provider key={i} value={cta.openIn}>
                                    <Button
                                        style={cta.style ?? computedStyle.Cta}
                                        label={cta.label}
                                        icon={cta.icon}
                                        onPress={() => follow(cta)}
                                    />
                                </CtaTargetContext.Provider>
                            ))}
                        </View>
                    )}
                </View>
                <View style={computedStyle.HorizontalMargin}/>
            </View>
        </CardContext.Provider>
    );

    function follow(cta: Cta): void
    {
        if (runningInsideWebBrowser)
        {
            window.open(cta.href, cta.openIn);
        }
        else
        {
            Linking.openURL(cta.href);
        }
    }
}
