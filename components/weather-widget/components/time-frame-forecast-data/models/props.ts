import {ComponentProps, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {ForecastData} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly timeFrameName: string;


    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly temperatureRangeForecastData: ForecastData;


    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly precipitationProbabilityForecastData: ForecastData;


    @IsDefined()
    @ValidateNested()
    @Type(() => ForecastData)
    readonly airQualityIndexForecastData: ForecastData;
}
