import {
    AllPropertiesMustPresent,
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
import {EventContext, Props, RowContext} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
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

    const context = useMemo<EventContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const duration = isOnGoing
        ? GregorianCalendar.getTimeDuration(startDate, new Date(), minimumTimeUnit)
        : endDate
            ? GregorianCalendar.getTimeDuration(startDate, endDate, minimumTimeUnit)
            : undefined;

    return (
        <EventContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Icon} name={icon}/>
                <View style={computedStyle.TriangleArrow}/>
                <Text style={computedStyle.Name}>{name}</Text>
                <View style={computedStyle.Hr}/>
                {image && <Image style={computedStyle.Image} source={image}/>}
                <RowContext.Provider value={"time"}>
                    <View style={computedStyle.Row}>
                        <Icon style={computedStyle.BulletinIcon} name={DefaultIconSet.Clock}/>
                        <Text style={computedStyle.StartDate}>
                            {GregorianCalendar.toString(startDate, DateFormat.Long, minimumTimeUnit)}
                        </Text>
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
                </RowContext.Provider>
                {duration && (
                    <RowContext.Provider value={"duration"}>
                        <View style={computedStyle.Row}>
                            <Icon style={computedStyle.BulletinIcon} name={DefaultIconSet.History}/>
                            <Text style={computedStyle.Duration}>{duration}</Text>
                        </View>
                    </RowContext.Provider>
                )}
                <RowContext.Provider value={"location"}>
                    <View style={computedStyle.Row}>
                        <Icon style={computedStyle.BulletinIcon} name={DefaultIconSet.Location}/>
                        {location && <Text style={computedStyle.Location}>{location}</Text>}
                    </View>
                </RowContext.Provider>
                <RowContext.Provider value={"description"}>
                    <View style={computedStyle.Row}>
                        <Icon style={computedStyle.BulletinIcon} name={DefaultIconSet.Pen}/>
                        {description && <Text style={computedStyle.Description}>{description}</Text>}
                    </View>
                </RowContext.Provider>
            </View>
        </EventContext.Provider>
    );
}
