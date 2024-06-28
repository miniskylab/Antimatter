import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SimpleForecastData, SimpleWeatherData} from "../components";
import {WeatherWidget} from "../main";
import {WeatherWidgetProps} from "../models";
import * as Variant from "../variants";

const WeatherWidgetWithValidation = withValidation(WeatherWidget, WeatherWidgetProps);
export default {
    component: WeatherWidget,
    title: "Components/Weather Widget"
} satisfies Meta<typeof WeatherWidget>;
type Story = StoryObj<typeof WeatherWidget>;

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
        simpleForecastData: Sb.locked
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
        simpleForecastData: [
            {
                timeFrame: "+1H",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Snow,
                    value: "9°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "35%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "90%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "24"
                }
            },
            {
                timeFrame: "+2H",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Mist,
                    value: "11°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "40%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "85%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "155",
                    highlightColor: SimpleForecastData.HighlightColor.Purple
                }
            },
            {
                timeFrame: "+4H",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Rain,
                    value: "13°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "45%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "80%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "85"
                }
            },
            {
                timeFrame: "+6H",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Sun,
                    value: "15°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "50%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "75%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "73"
                }
            },
            {
                timeFrame: "Today",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Rain,
                    value: "7 - 15°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "55%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "70%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "168",
                    highlightColor: SimpleForecastData.HighlightColor.Purple
                }
            },
            {
                timeFrame: "Tue",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Sun,
                    value: "6 - 9°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "60%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "65%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "121",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                }
            },
            {
                timeFrame: "Wed",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Thunderstorm,
                    value: "12 - 14°C",
                    highlightColor: SimpleForecastData.HighlightColor.Blue
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "65%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "60%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "100",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                }
            },
            {
                timeFrame: "Thu",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.ShowerRain,
                    value: "16 - 21°C"
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "5%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "55%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "5"
                }
            },
            {
                timeFrame: "Fri",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Cloudy,
                    value: "18 - 24°C"
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "0%"
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "5%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "0"
                }
            },
            {
                timeFrame: "Sat",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.PartlyCloudyDay,
                    value: "19 - 28°C"
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "80%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "0%"
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "186",
                    highlightColor: SimpleForecastData.HighlightColor.Purple
                }
            },
            {
                timeFrame: "Sun",
                temperatureRangeForecastData: {
                    icon: DefaultIconSet.Sun,
                    value: "29 - 38°C",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                humidityForecastData: {
                    icon: DefaultIconSet.Droplet,
                    value: "100%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                precipitationProbabilityForecastData: {
                    icon: DefaultIconSet.Umbrella,
                    value: "100%",
                    highlightColor: SimpleForecastData.HighlightColor.Tomato
                },
                airQualityIndexForecastData: {
                    icon: DefaultIconSet.AirQualityIndex,
                    value: "299",
                    highlightColor: SimpleForecastData.HighlightColor.Purple
                }
            }
        ]
    },
    render: args => <WeatherWidgetWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};
