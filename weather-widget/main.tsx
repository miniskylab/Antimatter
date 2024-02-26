import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SimpleWeatherData} from "./components";
import {PositionContext, WeatherWidgetContext, WeatherWidgetProps} from "./models";
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
                    <View style={computedStyle.StatusContainer}>
                        <Icon style={computedStyle.StatusIcon} name={locationData?.icon ?? DefaultIconSet.Location}/>
                        <Label style={computedStyle.StatusValue}>{locationData?.value ?? "--"}</Label>
                    </View>
                    <View style={computedStyle.StatusContainer}>
                        <Icon style={computedStyle.StatusIcon} name={lastUpdateData?.icon ?? DefaultIconSet.History}/>
                        <Label style={computedStyle.StatusValue}>{lastUpdateData?.value ?? "--:--:--"}</Label>
                    </View>
                </View>
                <View style={computedStyle.WeatherConditionContainer}>
                    <Icon style={computedStyle.WeatherConditionIcon} name={weatherConditionData?.icon ?? DefaultIconSet.NotAllowed}/>
                    <Label style={computedStyle.WeatherConditionLabel}>{weatherConditionData?.value ?? "--"}</Label>
                </View>
                <View style={computedStyle.MainContainer}>
                    <View style={computedStyle.FeelsLikeContainer}>
                        <Label style={computedStyle.FeelsLikeLabel}>{temperatureData?.feelsLikeTemperatureLabel ?? "--: "}</Label>
                        <Label style={computedStyle.FeelsLikeValue}>{temperatureData?.feelsLikeTemperatureValue ?? "--"}</Label>
                    </View>
                    <View style={computedStyle.TemperatureRangeValueContainer}>
                        <View style={computedStyle.TemperatureRangeHr}/>
                        {renderTemperatureRangeValue("left", temperatureData?.minTemperatureValue ?? "--")}
                        {renderTemperatureRangeValue("middle", temperatureData?.currentTemperatureValue ?? "--")}
                        {renderTemperatureRangeValue("right", temperatureData?.maxTemperatureValue ?? "--")}
                    </View>
                    <View style={computedStyle.TemperatureRangeLabelContainer}>
                        {renderTemperatureRangeLabel("left", temperatureData?.minTemperatureLabel ?? "Min")}
                        {renderTemperatureRangeLabel("middle", temperatureData?.currentTemperatureLabel ?? "Current")}
                        {renderTemperatureRangeLabel("right", temperatureData?.maxTemperatureLabel ?? "Max")}
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.UvIndexIcon} name={uvIndexData?.icon ?? DefaultIconSet.UvIndex}/>
                        <Label style={computedStyle.UvIndexDescription}>{uvIndexData?.value ?? "--"}</Label>
                    </View>
                    <View style={computedStyle.ShortWeatherDataContainer}>
                        <Icon style={computedStyle.WindIcon} name={windData?.icon ?? DefaultIconSet.Location}/>
                        <Label style={computedStyle.WindSpeed}>{windData?.speed ?? "--"}</Label>
                    </View>
                </View>
                {renderSimpleWeatherDataSection("left", simpleWeatherData1)}
                {renderSimpleWeatherDataSection("middle", simpleWeatherData2)}
                {renderSimpleWeatherDataSection("right", simpleWeatherData3)}
            </View>
        </WeatherWidgetContext.Provider>
    );

    function renderTemperatureRangeValue(position: PositionContext, value: string)
    {
        return (
            <PositionContext.Provider value={position}>
                <Label style={computedStyle.TemperatureRangeValue}>{value}</Label>
            </PositionContext.Provider>
        );
    }

    function renderTemperatureRangeLabel(position: PositionContext, label: string)
    {
        return (
            <PositionContext.Provider value={position}>
                <Label style={computedStyle.TemperatureRangeLabel}>{label}</Label>
            </PositionContext.Provider>
        );
    }

    function renderSimpleWeatherDataSection(position: PositionContext, simpleWeatherData?: SimpleWeatherData.Props)
    {
        return (
            <PositionContext.Provider value={position}>
                <SimpleWeatherData.Component
                    style={computedStyle.SimpleWeatherData}
                    icon={DefaultIconSet.NotAllowed}
                    title={"--"}
                    subtitle={"--"}
                    {...simpleWeatherData}
                />
            </PositionContext.Provider>
        );
    }
}
