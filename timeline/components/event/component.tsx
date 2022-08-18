import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {DateFormat, GregorianCalendar, TimeUnit} from "@miniskylab/antimatter-typescript";
import React from "react";
import {EventProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
    name = String.EMPTY,
    image,
    description = String.EMPTY,
    icon,
    startDate,
    endDate,
    isOnGoing = false,
    location = String.EMPTY,
    minimumTimeUnit = TimeUnit.Month
}: EventProps): JSX.Element
{
    return (
        <div className={className}>
            <Icon className={`${className}__icon`} name={icon}/>
            <div className={`${className}__triangle-arrow`}/>
            <Label className={`${className}__name`} text={name}/>
            <div className={`${className}__hr`}/>
            {image && <img className={`${className}__image`} src={image.url.original} alt={image.altText}/>}
            <div className={`${className}__row`}>
                <Icon className={`${className}__bulletin-icon`} name={Icomoon.Clock}/>
                <p className={`${className}__start-date`} suppressHydrationWarning={true}>
                    {GregorianCalendar.toString(startDate, DateFormat.Long, minimumTimeUnit)}
                </p>
                {(isOnGoing || endDate) && <Icon className={`${className}__arrow-right-icon`} name={Icomoon.ArrowRight}/>}
                {
                    isOnGoing && <Label text={"Now"}/>
                    ||
                    endDate && (
                        <p className={`${className}__end-date`} suppressHydrationWarning={true}>
                            {GregorianCalendar.toString(endDate, DateFormat.Long, minimumTimeUnit)}
                        </p>
                    )
                }
            </div>
            {(isOnGoing || endDate) && (
                <div className={`${className}__row`}>
                    <Icon className={`${className}__bulletin-icon`} name={Icomoon.History}/>
                    <Label
                        className={`${className}__duration`}
                        text={GregorianCalendar.getTimeDuration(startDate, isOnGoing ? new Date() : endDate, minimumTimeUnit)}
                    />
                </div>
            )}
            <div className={`${className}__row`}>
                <Icon className={`${className}__bulletin-icon`} name={Icomoon.Location}/>
                {location && <Label className={`${className}__location`} text={location}/>}
            </div>
            <div className={`${className}__row`}>
                <Icon className={`${className}__bulletin-icon--top-aligned`} name={Icomoon.Pen}/>
                {description && <Label className={`${className}__description`} text={description}/>}
            </div>
        </div>
    );
}
