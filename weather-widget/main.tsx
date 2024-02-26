import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SimpleWeatherData} from "./components";
import {SimpleWeatherDataPositionContext, WeatherWidgetContext, WeatherWidgetProps} from "./models";
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
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData?.minTemperatureValue ?? "--"}</Label>
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData?.currentTemperatureValue ?? "--"}</Label>
                        <Label style={computedStyle.TemperatureRangeValue}>{temperatureData?.maxTemperatureValue ?? "--"}</Label>
                    </View>
                    <View style={computedStyle.TemperatureRangeLabelContainer}>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData?.minTemperatureLabel ?? "Min"}</Label>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData?.currentTemperatureLabel ?? "Current"}</Label>
                        <Label style={computedStyle.TemperatureRangeLabel}>{temperatureData?.maxTemperatureLabel ?? "Max"}</Label>
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
                {renderSimpleWeatherDataBlock("left", simpleWeatherData1)}
                {renderSimpleWeatherDataBlock("middle", simpleWeatherData2)}
                {renderSimpleWeatherDataBlock("right", simpleWeatherData3)}
            </View>
        </WeatherWidgetContext.Provider>
    );

    function renderSimpleWeatherDataBlock(position: SimpleWeatherDataPositionContext, simpleWeatherData?: SimpleWeatherData.Props)
    {
        return (
            <SimpleWeatherDataPositionContext.Provider value={position}>
                <SimpleWeatherData.Component
                    style={computedStyle.SimpleWeatherData}
                    icon={DefaultIconSet.NotAllowed}
                    title={"--"}
                    subtitle={"--"}
                    {...simpleWeatherData}
                />
            </SimpleWeatherDataPositionContext.Provider>
        );
    }
}
