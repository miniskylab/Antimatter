import React from "react";
import {Card} from "./components/card";
import {TopicCardsComponentProps} from "./models/topic-cards-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TopicCardsComponent(props: TopicCardsComponentProps): JSX.Element
{
    return (
        <div className={props.variant["topic-cards"]}>
            <div className={props.variant["topic-cards__container"]}>
                {[...props.cards].map((x, i) => (
                    <Card
                        key={i}
                        variant={x.variant}
                        icon={x.icon}
                        name={x.name}
                        description={x.description}
                        thisIsPlaceholderCard={x.thisIsPlaceholderCard}
                        ctaButtons={x.ctaButtons}
                    />
                ))}
            </div>
        </div>
    );
}
