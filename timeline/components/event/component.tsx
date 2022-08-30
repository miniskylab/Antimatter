import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
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
        <div className={bem(className)}>
            <Icon className={bem("Timeline-Event-Icon")} name={icon}/>
            <div className={bem(className, "TriangleArrow")}/>
            <Label className={bem("Timeline-Event-Name")} text={name}/>
            <div className={bem(className, "Hr")}/>
            {image && <img className={bem(className, "Image")} src={image.url.original} alt={image.altText}/>}
            <div className={bem(className, "Row")}>
                <Icon className={bem("Timeline-Event-BulletinIcon")} name={Icomoon.Clock}/>
                <p className={bem(className, "StartDate")} suppressHydrationWarning={true}>
                    {GregorianCalendar.toString(startDate, DateFormat.Long, minimumTimeUnit)}
                </p>
                {(isOnGoing || endDate) && <Icon className={bem("Timeline-Event-ArrowRightIcon")} name={Icomoon.ArrowRight}/>}
                {
                    isOnGoing && <Label text={"Now"}/>
                    ||
                    endDate && (
                        <p className={bem(className, "EndDate")} suppressHydrationWarning={true}>
                            {GregorianCalendar.toString(endDate, DateFormat.Long, minimumTimeUnit)}
                        </p>
                    )
                }
            </div>
            {(isOnGoing || endDate) && (
                <div className={bem(className, "Row")}>
                    <Icon className={bem("Timeline-Event-BulletinIcon")} name={Icomoon.History}/>
                    <Label
                        className={bem("Timeline-Event-Duration")}
                        text={GregorianCalendar.getTimeDuration(startDate, isOnGoing ? new Date() : endDate, minimumTimeUnit)}
                    />
                </div>
            )}
            <div className={bem(className, "Row")}>
                <Icon className={bem("Timeline-Event-BulletinIcon")} name={Icomoon.Location}/>
                {location && <Label className={bem("Timeline-Event-Location")} text={location}/>}
            </div>
            <div className={bem(className, "Row")}>
                <Icon className={bem("Timeline-Event-BulletinIcon", null, "TopAligned")} name={Icomoon.Pen}/>
                {description && <Label className={bem("Timeline-Event-Description")} text={description}/>}
            </div>
        </div>
    );
}
