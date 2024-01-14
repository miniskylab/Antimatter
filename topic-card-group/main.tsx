import {AllPropertiesMustPresent, Style} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Card} from "./components";
import {TopicCardGroupContext, TopicCardGroupProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TopicCardGroup({
    style = Variant.FourColumns,
    cards = []
}: TopicCardGroupProps): JSX.Element
{
    const props: AllPropertiesMustPresent<TopicCardGroupProps> = {
        style, cards
    };

    const context = useMemo<TopicCardGroupContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <TopicCardGroupContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        {...cardProps}
                        style={computedStyle.Card}
                    />
                ))}
                {renderShadow()}
            </View>
        </TopicCardGroupContext.Provider>
    );

    function renderShadow(): JSX.Element
    {
        return (
            <View
                style={viewProps => ({
                    ...computedStyle.Root(viewProps),
                    position: "absolute",
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    zIndex: Style.Layer.Ambient
                })}
            >
                <View
                    pointerEvents={"none"}
                    style={() => ({
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: Style.Layer.AlwaysOnTop
                    })}
                />
                {cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        {...cardProps}
                        style={cardProps => ({
                            ...computedStyle.Card(cardProps),
                            Content: viewProps => ({
                                ...computedStyle.Card(cardProps).Content(viewProps),
                                ...computedStyle.Card(cardProps).Shadow(),
                                backgroundColor: undefined
                            }),
                            Icon: iconProps => ({...computedStyle.Card(cardProps).Icon(iconProps), opacity: 0}),
                            Image: imageProps => ({...computedStyle.Card(cardProps).Image(imageProps), opacity: 0}),
                            Title: labelProps => ({...computedStyle.Card(cardProps).Title(labelProps), opacity: 0}),
                            Description: labelProps => ({...computedStyle.Card(cardProps).Description(labelProps), opacity: 0}),
                            CtaContainer: viewProps => ({...computedStyle.Card(cardProps).CtaContainer(viewProps), opacity: 0})
                        })}
                    />
                ))}
            </View>
        );
    }
}
