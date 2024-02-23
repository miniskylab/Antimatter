import {Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
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
        weatherDescriptionData: Sb.locked,
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
        weatherDescriptionData: {icon: DefaultIconSet.Rain, value: "Light Freezing Drizzle"},
        temperatureData: {
            minTemperatureLabel: "Min",
            minTemperatureValue: "29°C",
            currentTemperatureLabel: "Current",
            currentTemperatureValue: "34°C",
            maxTemperatureLabel: "Max",
            maxTemperatureValue: "41°C",
            realFeelTemperatureLabel: "Real Feel:",
            realFeelTemperatureValue: "45°C",
            isHighlighted: true
        },
        uvIndexData: {icon: DefaultIconSet.UvIndex, value: "Extreme"},
        windData: {icon: DefaultIconSet.Direction, speed: "17 km/h", direction: "N", isHighlighted: true},
        simpleWeatherData1: {icon: DefaultIconSet.AirQualityIndex, title: "145", subtitle: "Likely Unhealthy"},
        simpleWeatherData2: {icon: DefaultIconSet.Umbrella, title: "90% ★★★", subtitle: "In 15 minutes", isHighlighted: true},
        simpleWeatherData3: {icon: DefaultIconSet.Droplet, title: "97%", subtitle: "Very Humid"}
    },
    render: args => <WeatherWidgetWithValidation {...args} key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}/>
};
