import {Html} from "@miniskylab/antimatter-html";
import {Icon, IconName} from "@miniskylab/antimatter-icon-legacy";
import {DateFormat, GregorianCalendar, TimeUnit} from "@miniskylab/antimatter-typescript";
import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        position,
        name,
        image,
        description = String.EMPTY,
        icon,
        startDate,
        endDate,
        isOnGoing = false,
        location = String.EMPTY,
        minimumTimeUnit = TimeUnit.Month
    } = props;

    return (
        <div className={variant[`event--${position}`]}>
            <Icon className={variant[`event__icon--${position}`]} iconName={icon}/>
            <div className={variant[`event__triangle-arrow--${position}`]}/>
            <div className={variant["event__name"]}>{name}</div>
            <div className={variant["event__hr"]}/>
            {image && <img className={variant["event__image"]} src={image.url.original} alt={image.altText}/>}
            <div className={variant["event__row"]}>
                <Icon className={variant["event__bulletin-icon"]} iconName={IconName.Clock}/>
                <p className={variant["event__start-date"]} suppressHydrationWarning={true}>
                    {GregorianCalendar.toString(startDate, DateFormat.Long, minimumTimeUnit)}
                </p>
                {(isOnGoing || endDate) && <Icon className={variant["event__arrow-right-icon"]} iconName={IconName.ArrowRight}/>}
                {
                    isOnGoing && <p>Now</p>
                    ||
                    endDate && (
                        <p className={variant["event__end-date"]} suppressHydrationWarning={true}>
                            {GregorianCalendar.toString(endDate, DateFormat.Long, minimumTimeUnit)}
                        </p>
                    )
                }
            </div>
            {(isOnGoing || endDate) && (
                <div className={variant["event__row"]}>
                    <Icon className={variant["event__bulletin-icon"]} iconName={IconName.History}/>
                    <p className={variant["event__duration"]}>
                        {GregorianCalendar.getTimeDuration(startDate, isOnGoing ? new Date() : endDate, minimumTimeUnit)}
                    </p>
                </div>
            )}

            <div className={variant["event__row"]}>
                <Icon className={variant["event__bulletin-icon"]} iconName={IconName.Location}/>
                <div className={variant["event__location"]}>
                    {location && Html.render(location)}
                </div>
            </div>
            <div className={variant["event__row"]}>
                <Icon className={variant["event__bulletin-icon--top-aligned"]} iconName={IconName.Pen}/>
                {description && Html.render(description)}
            </div>
        </div>
    );
}
