import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SimpleWeatherData, TimeFrameForecastData} from "../components";
import {WeatherWidget} from "../main";
import {WeatherWidgetProps} from "../models";
import * as Variant from "../variants";

export default {component: WeatherWidget, title: "Components/Weather Widget"} satisfies Meta<typeof WeatherWidget>;
type Story = StoryObj<typeof WeatherWidget>;

const WeatherWidgetWithValidation = withValidation(WeatherWidget, WeatherWidgetProps);
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        locationData: Sb.locked,
        lastUpdateData: Sb.locked,
        weatherConditionData: Sb.locked,
        temperatureData: Sb.locked,
        uvIndexData: Sb.locked,
        windData: Sb.locked,
        simpleWeatherData1: Sb.locked,
        simpleWeatherData2: Sb.locked,
        simpleWeatherData3: Sb.locked,
        timeFrameForecastData: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        locationData: {icon: DefaultIconSet.Location, value: "Hanoi, Vietnam"},
        lastUpdateData: {icon: DefaultIconSet.History, value: "09:00:15"},
        weatherConditionData: {icon: DefaultIconSet.Rain, value: "Light Freezing Drizzle"},
        temperatureData: {
            minTemperatureLabel: "Min",
            minTemperatureValue: "8°C",
            currentTemperatureLabel: "Current",
            currentTemperatureValue: "12°C",
            maxTemperatureLabel: "Max",
            maxTemperatureValue: "16°C",
            feelsLikeTemperatureLabel: "Feels Like:",
            feelsLikeTemperatureValue: "10°C",
            highlightColor: SimpleWeatherData.HighlightColor.Blue
        },
        uvIndexData: {
            icon: DefaultIconSet.UvIndex,
            value: "Extreme"
        },
        windData: {
            icon: DefaultIconSet.Direction,
            speedAndGusts: "17 - 24 km/h",
            direction: 135,
            highlightColor: SimpleWeatherData.HighlightColor.Tomato
        },
        simpleWeatherData1: {
            icon: DefaultIconSet.AirQualityIndex,
            title: "145",
            subtitle: "Likely Unhealthy",
            highlightColor: SimpleWeatherData.HighlightColor.Purple
        },
        simpleWeatherData2: {
            icon: DefaultIconSet.Umbrella,
            title: "90% ⁂",
            subtitle: "In 15 minutes",
            highlightColor: SimpleWeatherData.HighlightColor.Tomato
        },
        simpleWeatherData3: {
            icon: DefaultIconSet.Droplet,
            title: "60%",
            subtitle: "Comfortable"
        },
        timeFrameForecastData: [
            {
                timeFrameName: "01:00",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Snow,
                    value: "9°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Blue
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "0%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "0"
                }
            },
            {
                timeFrameName: "02:00",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Mist,
                    value: "11°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Blue
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "5%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "5"
                }
            },
            {
                timeFrameName: "04:00",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Rain,
                    value: "13°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Blue
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "40%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "85"
                }
            },
            {
                timeFrameName: "06:00",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.ShowerRain,
                    value: "15°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Blue
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "50%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "100",
                    highlightColor: TimeFrameForecastData.HighlightColor.Tomato
                }
            },
            {
                timeFrameName: "Today",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Thunderstorm,
                    value: "7 - 15°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Blue
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "60%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "135",
                    highlightColor: TimeFrameForecastData.HighlightColor.Tomato
                }
            },
            {
                timeFrameName: "Tue",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Cloudy,
                    value: "18 - 24°C"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "80%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "200",
                    highlightColor: TimeFrameForecastData.HighlightColor.Purple
                }
            },
            {
                timeFrameName: "Wed",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.PartlyCloudyDay,
                    value: "19 - 28°C"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "90%",
                    highlightColor: TimeFrameForecastData.HighlightColor.Tomato
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "250",
                    highlightColor: TimeFrameForecastData.HighlightColor.Purple
                }
            },
            {
                timeFrameName: "Thu",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Sun,
                    value: "29 - 38°C",
                    highlightColor: TimeFrameForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "100%",
                    highlightColor: TimeFrameForecastData.HighlightColor.Tomato
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "300",
                    highlightColor: TimeFrameForecastData.HighlightColor.Purple
                }
            }
        ]
    },
    render: args => <WeatherWidgetWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};
