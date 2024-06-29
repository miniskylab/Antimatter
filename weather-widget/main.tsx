import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SimpleWeatherData, TimeFrameForecastData} from "./components";
import {WeatherWidgetContext, WeatherWidgetProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function WeatherWidget({
    style = Variant.Default,
    locationData,
    lastUpdateData,
    weatherConditionData,
    temperatureData,
    uvIndexData,
    windData,
    simpleWeatherData1,
    simpleWeatherData2,
    simpleWeatherData3,
    timeFrameForecastData
}: WeatherWidgetProps): JSX.Element
{
    const props: AllPropertiesMustPresent<WeatherWidgetProps> = {
        style, locationData, lastUpdateData, weatherConditionData, temperatureData, uvIndexData, windData, simpleWeatherData1,
        simpleWeatherData2, simpleWeatherData3, timeFrameForecastData
    };

    const context = useMemo<WeatherWidgetContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <WeatherWidgetContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.StatusBar}>
                    <View style={computedStyle.StatusContainer}>
                        <Icon style={computedStyle.StatusIcon} name={locationData?.icon ?? DefaultIconSet.Location}/>
                        <Text style={computedStyle.StatusValue}>{locationData?.value ?? "--"}</Text>
                    </View>
                    <View style={computedStyle.StatusContainer}>
                        <Icon style={computedStyle.StatusIcon} name={lastUpdateData?.icon ?? DefaultIconSet.History}/>
                        <Text style={computedStyle.StatusValue}>{lastUpdateData?.value ?? "--:--:--"}</Text>
                    </View>
                </View>
                <View style={computedStyle.WeatherConditionContainer}>
                    <Icon style={computedStyle.WeatherConditionIcon} name={weatherConditionData?.icon ?? DefaultIconSet.NotAllowed}/>
                    <Text style={computedStyle.WeatherConditionLabel}>{weatherConditionData?.value ?? "--"}</Text>
                </View>
                <View style={computedStyle.MainContainer}>
                    <View style={computedStyle.FeelsLikeContainer}>
                        <Text style={computedStyle.FeelsLikeLabel}>{temperatureData?.feelsLikeTemperatureLabel ?? "--: "}</Text>
                        <Text style={computedStyle.FeelsLikeValue}>{temperatureData?.feelsLikeTemperatureValue ?? "--"}</Text>
                    </View>
                    <View style={computedStyle.TemperatureRangeValueContainer}>
                        <View style={computedStyle.TemperatureRangeHr}/>
                        <Text style={computedStyle.TemperatureRangeMinValue}>{temperatureData?.minTemperatureValue ?? "--"}</Text>
                        <Text style={computedStyle.TemperatureRangeCurrentValue}>{temperatureData?.currentTemperatureValue ?? "--"}</Text>
                        <Text style={computedStyle.TemperatureRangeMaxValue}>{temperatureData?.maxTemperatureValue ?? "--"}</Text>
                    </View>
                    <View style={computedStyle.TemperatureRangeLabelContainer}>
                        <Text style={computedStyle.TemperatureRangeMinLabel}>{temperatureData?.minTemperatureLabel}</Text>
                        <Text style={computedStyle.TemperatureRangeCurrentLabel}>{temperatureData?.currentTemperatureLabel}</Text>
                        <Text style={computedStyle.TemperatureRangeMaxLabel}>{temperatureData?.maxTemperatureLabel}</Text>
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.UvIndexIcon} name={uvIndexData?.icon ?? DefaultIconSet.UvIndex}/>
                        <Text style={computedStyle.UvIndexDescription}>{uvIndexData?.value ?? "--"}</Text>
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.WindIcon} name={windData?.icon ?? DefaultIconSet.Location}/>
                        <Text style={computedStyle.WindSpeed}>{windData?.speedAndGusts ?? "--"}</Text>
                    </View>
                </View>
                <SimpleWeatherData.Component
                    style={computedStyle.SimpleWeatherDataLeft}
                    icon={DefaultIconSet.NotAllowed}
                    title={"--"}
                    subtitle={"--"}
                    {...simpleWeatherData1}
                />
                <SimpleWeatherData.Component
                    style={computedStyle.SimpleWeatherDataMiddle}
                    icon={DefaultIconSet.NotAllowed}
                    title={"--"}
                    subtitle={"--"}
                    {...simpleWeatherData2}
                />
                <SimpleWeatherData.Component
                    style={computedStyle.SimpleWeatherDataRight}
                    icon={DefaultIconSet.NotAllowed}
                    title={"--"}
                    subtitle={"--"}
                    {...simpleWeatherData3}
                />
                {timeFrameForecastData && timeFrameForecastData.length > 0 && (
                    <View style={computedStyle.TimeFrameForecastDataContainer}>
                        {timeFrameForecastData.map(x => (
                            <TimeFrameForecastData.Component key={x.timeFrameName} style={computedStyle.TimeFrameForecastData} {...x}/>
                        ))}
                    </View>
                )}
            </View>
        </WeatherWidgetContext.Provider>
    );
}
