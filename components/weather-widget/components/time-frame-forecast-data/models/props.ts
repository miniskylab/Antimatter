import {ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {ForecastData} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the name of the time frame.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly timeFrameName: string;


    /**
     * Specify the forecast temperature range of the time frame.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly temperatureRangeForecastData: ForecastData;


    /**
     * Specify the forecast precipitation probability of the time frame.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly precipitationProbabilityForecastData: ForecastData;


    /**
     * Specify the forecast air quality index of the time frame.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly airQualityIndexForecastData: ForecastData;
}
