import {
    type AllPropertiesMustPresent,
    DateFormat,
    EMPTY_STRING,
    GregorianCalendar,
    TimeUnit,
    Ts,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Image} from "@miniskylab/antimatter-image";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {EventContext, Props} from "./models";

export function Component({
    style,
    index,
    name = EMPTY_STRING,
    image,
    description = EMPTY_STRING,
    icon,
    startDate,
    endDate,
    isOnGoing = false,
    location = EMPTY_STRING,
    minimumTimeUnit = TimeUnit.Month
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, index, name, image, description, icon, startDate, endDate, isOnGoing, location, minimumTimeUnit
    };

    const duration = useMemo(() => getDuration(), [isOnGoing, startDate, endDate, minimumTimeUnit]);

    const context = useMemo<EventContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <EventContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Icon} name={icon}/>
                <View style={computedStyle.TriangleArrow}/>
                <Text style={computedStyle.Name}>{name}</Text>
                <View style={computedStyle.Hr}/>
                {image && <Image style={computedStyle.Image} source={image}/>}
                <View style={computedStyle.TimeRow}>
                    <Icon style={computedStyle.TimeBulletinIcon} name={DefaultIconSet.Clock}/>
                    <Text style={computedStyle.StartDate}>{GregorianCalendar.toString(startDate, DateFormat.Long, minimumTimeUnit)}</Text>
                    {(isOnGoing || endDate) && <Icon style={computedStyle.ArrowRightIcon} name={DefaultIconSet.ArrowRight}/>}
                    {
                        isOnGoing && <Text style={computedStyle.EndDate}>Now</Text>
                        ||
                        endDate && (
                            <Text style={computedStyle.EndDate}>
                                {GregorianCalendar.toString(endDate, DateFormat.Long, minimumTimeUnit)}
                            </Text>
                        )
                    }
                </View>
                {duration && (
                    <View style={computedStyle.DurationRow}>
                        <Icon style={computedStyle.DurationBulletinIcon} name={DefaultIconSet.History}/>
                        <Text style={computedStyle.Duration}>{duration}</Text>
                    </View>
                )}
                <View style={computedStyle.LocationRow}>
                    <Icon style={computedStyle.LocationBulletinIcon} name={DefaultIconSet.Location}/>
                    {location && <Text style={computedStyle.Location}>{location}</Text>}
                </View>
                <View style={computedStyle.DescriptionRow}>
                    <Icon style={computedStyle.DescriptionBulletinIcon} name={DefaultIconSet.Pen}/>
                    {description && <Text style={computedStyle.Description}>{description}</Text>}
                </View>
            </View>
        </EventContext.Provider>
    );

    function getDuration(): string | undefined
    {
        return isOnGoing
            ? GregorianCalendar.getTimeDuration(startDate, new Date(), minimumTimeUnit)
            : endDate
                ? GregorianCalendar.getTimeDuration(startDate, endDate, minimumTimeUnit)
                : undefined;
    }
}
