import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (simpleForecastDataProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    TimeFrame: TextStyle;
    TemperatureForecastDataContainer: ViewStyle;
    TemperatureForecastDataIcon: IconStyle;
    TemperatureForecastDataValue: TextStyle;
    HumidityForecastDataContainer: ViewStyle;
    HumidityForecastDataIcon: IconStyle;
    HumidityForecastDataValue: TextStyle;
    PrecipitationProbabilityForecastDataContainer: ViewStyle;
    PrecipitationProbabilityForecastDataIcon: IconStyle;
    PrecipitationProbabilityForecastDataValue: TextStyle;
    AirQualityIndexForecastDataContainer: ViewStyle;
    AirQualityIndexForecastDataIcon: IconStyle;
    AirQualityIndexForecastDataValue: TextStyle;
};
