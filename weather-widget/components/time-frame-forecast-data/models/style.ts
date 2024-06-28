import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (timeFrameForecastDataProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    TimeFrameName: TextStyle;
    TemperatureContainer: ViewStyle;
    TemperatureIcon: IconStyle;
    TemperatureValue: TextStyle;
    PrecipitationProbabilityContainer: ViewStyle;
    PrecipitationProbabilityIcon: IconStyle;
    PrecipitationProbabilityValue: TextStyle;
    AirQualityIndexContainer: ViewStyle;
    AirQualityIndexIcon: IconStyle;
    AirQualityIndexValue: TextStyle;
};
