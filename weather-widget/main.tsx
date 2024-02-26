import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SimpleWeatherData} from "./components";
import {SimpleWeatherDataPositionContext, WeatherWidgetContext, WeatherWidgetProps} from "./models";
import {ShortWeatherData} from "./types";
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
    simpleWeatherData3
}: WeatherWidgetProps): JSX.Element
{
    const props: AllPropertiesMustPresent<WeatherWidgetProps> = {
        style, locationData, lastUpdateData, weatherConditionData, temperatureData, uvIndexData, windData, simpleWeatherData1,
        simpleWeatherData2, simpleWeatherData3
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
                    {renderStatusEntry(locationData)}
                    {renderStatusEntry(lastUpdateData)}
                </View>
                <View style={computedStyle.WeatherConditionContainer}>
                    <Icon style={computedStyle.WeatherConditionIcon} name={weatherConditionData.icon}/>
                    <Label style={computedStyle.WeatherConditionLabel}>{weatherConditionData.value}</Label>
                </View>
                <View style={computedStyle.MainContainer}>
                    <View style={computedStyle.FeelsLikeContainer}>
                        <Label style={computedStyle.FeelsLikeLabel}>{temperatureData.feelsLikeTemperatureLabel}</Label>
                        <Label style={computedStyle.FeelsLikeValue}>{temperatureData.feelsLikeTemperatureValue}</Label>
                    </View>
                    <View style={computedStyle.TemperatureRangeValueContainer}>
                        <View style={computedStyle.TemperatureRangeHr}/>
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData.minTemperatureValue}</Label>
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData.currentTemperatureValue}</Label>
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData.maxTemperatureValue}</Label>
                    </View>
                    <View style={computedStyle.TemperatureRangeLabelContainer}>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData.minTemperatureLabel}</Label>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData.currentTemperatureLabel}</Label>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData.maxTemperatureLabel}</Label>
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.UvIndexIcon} name={uvIndexData.icon}/>
                        <Label style={computedStyle.UvIndexDescription}>{uvIndexData.value}</Label>
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.WindIcon} name={windData.icon}/>
                        <Label style={computedStyle.WindSpeed}>{windData.speed}</Label>
                    </View>
                </View>
                {renderSimpleWeatherDataBlock("left", simpleWeatherData1)}
                {renderSimpleWeatherDataBlock("middle", simpleWeatherData2)}
                {renderSimpleWeatherDataBlock("right", simpleWeatherData3)}
            </View>
        </WeatherWidgetContext.Provider>
    );

    function renderStatusEntry(statusData: ShortWeatherData)
    {
        return (
            <View style={computedStyle.StatusContainer}>
                <Icon style={computedStyle.StatusIcon} name={statusData.icon}/>
                <Label style={computedStyle.StatusValue}>{statusData.value}</Label>
            </View>
        );
    }

    function renderSimpleWeatherDataBlock(position: SimpleWeatherDataPositionContext, simpleWeatherData: SimpleWeatherData.Props)
    {
        return (
            <SimpleWeatherDataPositionContext.Provider value={position}>
                <SimpleWeatherData.Component style={computedStyle.SimpleWeatherData} {...simpleWeatherData}/>
            </SimpleWeatherDataPositionContext.Provider>
        );
    }
}
