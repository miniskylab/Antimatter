import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, SimpleForecastDataContext} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    timeFrame,
    temperatureRangeForecastData,
    humidityForecastData,
    precipitationProbabilityForecastData,
    airQualityIndexForecastData
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, timeFrame, temperatureRangeForecastData, humidityForecastData, precipitationProbabilityForecastData,
        airQualityIndexForecastData
    };

    const context = useMemo<SimpleForecastDataContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SimpleForecastDataContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.TimeFrame}>{timeFrame}</Text>
                <View style={computedStyle.TemperatureForecastDataContainer}>
                    <Icon style={computedStyle.TemperatureForecastDataIcon} name={temperatureRangeForecastData.icon}/>
                    <Text style={computedStyle.TemperatureForecastDataValue}>{temperatureRangeForecastData.value}</Text>
                </View>
                <View style={computedStyle.HumidityForecastDataContainer}>
                    <Icon style={computedStyle.HumidityForecastDataIcon} name={humidityForecastData.icon}/>
                    <Text style={computedStyle.HumidityForecastDataValue}>{humidityForecastData.value}</Text>
                </View>
                <View style={computedStyle.PrecipitationProbabilityForecastDataContainer}>
                    <Icon style={computedStyle.PrecipitationProbabilityForecastDataIcon} name={precipitationProbabilityForecastData.icon}/>
                    <Text style={computedStyle.PrecipitationProbabilityForecastDataValue}>
                        {precipitationProbabilityForecastData.value}
                    </Text>
                </View>
                <View style={computedStyle.AirQualityIndexForecastDataContainer}>
                    <Icon style={computedStyle.AirQualityIndexForecastDataIcon} name={airQualityIndexForecastData.icon}/>
                    <Text style={computedStyle.AirQualityIndexForecastDataValue}>{airQualityIndexForecastData.value}</Text>
                </View>
            </View>
        </SimpleForecastDataContext.Provider>
    );
}
