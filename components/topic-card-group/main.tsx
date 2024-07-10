import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Card} from "./components";
import {TopicCardGroupContext, TopicCardGroupProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that displays content and actions about multiple subjects.
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

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

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
            </View>
        </TopicCardGroupContext.Provider>
    );
}
