import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {Props, TimeFrameForecastDataContext} from "./models";

export function Component({
    style,
    timeFrameName,
    temperatureRangeForecastData,
    precipitationProbabilityForecastData,
    airQualityIndexForecastData
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, timeFrameName, temperatureRangeForecastData, precipitationProbabilityForecastData, airQualityIndexForecastData
    };

    const context = useComponentContext<TimeFrameForecastDataContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <TimeFrameForecastDataContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Text style={computedStyle.TimeFrameName}>{timeFrameName}</Text>
                <View style={computedStyle.TemperatureContainer}>
                    <Icon style={computedStyle.TemperatureIcon} name={temperatureRangeForecastData.icon}/>
                    <Text style={computedStyle.TemperatureValue}>{temperatureRangeForecastData.value}</Text>
                </View>
                <View style={computedStyle.PrecipitationProbabilityContainer}>
                    <Icon style={computedStyle.PrecipitationProbabilityIcon} name={precipitationProbabilityForecastData.icon}/>
                    <Text style={computedStyle.PrecipitationProbabilityValue}>{precipitationProbabilityForecastData.value}</Text>
                </View>
                <View style={computedStyle.AirQualityIndexContainer}>
                    <Icon style={computedStyle.AirQualityIndexIcon} name={airQualityIndexForecastData.icon}/>
                    <Text style={computedStyle.AirQualityIndexValue}>{airQualityIndexForecastData.value}</Text>
                </View>
            </View>
        </TimeFrameForecastDataContext.Provider>
    );
}
