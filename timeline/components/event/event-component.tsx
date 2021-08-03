import {DateFormat, GregorianCalendar, TimeUnit} from "antimatter/date-time";
import {Icon, IconName} from "antimatter/icon";
import {Markdown} from "antimatter/markdown";
import React from "react";
import {EventComponentProps} from "./models/event-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function EventComponent(props: EventComponentProps): JSX.Element
{
    if (props.minimumTimeUnit > TimeUnit.Day)
    {
        if (props.startDate)
        {
            props.startDate.setDate(1);
        }

        if (props.endDate)
        {
            props.endDate.setDate(28);
        }
    }

    if (props.minimumTimeUnit === TimeUnit.Year)
    {
        if (props.startDate)
        {
            props.startDate.setMonth(0);
        }

        if (props.endDate)
        {
            props.endDate.setMonth(11);
        }
    }

    return (
        <div className={props.variant[`event--${props.position}`]}>
            <Icon
                className={props.variant[`event__icon--${props.position}`]}
                iconName={props.icon}
            />
            <div className={props.variant[`event__triangle-arrow--${props.position}`]}/>
            <div className={props.variant["event__name"]}>{props.name}</div>
            <div className={props.variant["event__hr"]}/>
            {props.image && (
                <img
                    className={props.variant["event__image"]}
                    src={props.image.url.original}
                    alt={props.image.altText}
                />
            )}
            <div className={props.variant["event__row"]}>
                <Icon
                    className={props.variant["event__bulletin-icon"]}
                    iconName={IconName.Clock}
                />
                <p className={props.variant["event__start-date"]} suppressHydrationWarning={true}>
                    {GregorianCalendar.toString(props.startDate, DateFormat.Long, props.minimumTimeUnit)}
                </p>
                {(props.isOnGoing || props.endDate) && (
                    <Icon
                        className={props.variant["event__arrow-right-icon"]}
                        iconName={IconName.ArrowRight}
                    />
                )}
                {
                    props.isOnGoing && <p>Now</p>
                    ||
                    props.endDate && (
                        <p className={props.variant["event__end-date"]} suppressHydrationWarning={true}>
                            {GregorianCalendar.toString(props.endDate, DateFormat.Long, props.minimumTimeUnit)}
                        </p>
                    )
                }
            </div>
            {(props.isOnGoing || props.endDate) && (
                <div className={props.variant["event__row"]}>
                    <Icon
                        className={props.variant["event__bulletin-icon"]}
                        iconName={IconName.History}
                    />
                    <p className={props.variant["event__duration"]}>
                        {GregorianCalendar.getTimeDuration(
                            props.startDate,
                            props.isOnGoing
                                ? new Date()
                                : props.endDate,
                            props.minimumTimeUnit
                        )}
                    </p>
                </div>
            )}

            <div className={props.variant["event__row"]}>
                <Icon
                    className={props.variant["event__bulletin-icon"]}
                    iconName={IconName.Location}
                />
                <div className={props.variant["event__location"]}>
                    {props.location && Markdown.render(props.location)}
                </div>
            </div>
            <div className={props.variant["event__row"]}>
                <Icon
                    className={props.variant["event__bulletin-icon--top-aligned"]}
                    iconName={IconName.Pen}
                />
                {props.description && Markdown.render(props.description)}
            </div>
        </div>
    );
}
