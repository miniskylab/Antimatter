import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SimpleWeatherData} from "../components";
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
        simpleWeatherData3: Sb.locked
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
            speed: "17 km/h",
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
        }
    },
    render: args => <WeatherWidgetWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};
