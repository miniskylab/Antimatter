import {ComponentName, ComponentProps} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {ShortWeatherData, TemperatureData, WindData} from "../classes";
import {SimpleWeatherData, TimeFrameForecastData} from "../components";
import {type WeatherWidgetStyle} from "./style";

@ComponentName("Weather Widget")
export class WeatherWidgetProps extends ComponentProps<WeatherWidgetStyle>
{
    /**
     * Specify the location for which the weather data was fetched.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ShortWeatherData)
    readonly locationData?: ShortWeatherData;


    /**
     * Specify the last time the weather data was fetched from the server.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ShortWeatherData)
    readonly lastUpdateData?: ShortWeatherData;


    /**
     * Specify weather condition data.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ShortWeatherData)
    readonly weatherConditionData?: ShortWeatherData;


    /**
     * Specify temperature data.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => TemperatureData)
    readonly temperatureData?: TemperatureData;


    /**
     * Specify UV index data.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ShortWeatherData)
    readonly uvIndexData?: ShortWeatherData;


    /**
     * Specify wind data.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => WindData)
    readonly windData?: WindData;


    /**
     * Specify additional weather data.
     *
     * @type SimpleWeatherData
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimpleWeatherData.Props)
    readonly simpleWeatherData1?: SimpleWeatherData.Props;


    /**
     * Specify additional weather data.
     *
     * @type SimpleWeatherData
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimpleWeatherData.Props)
    readonly simpleWeatherData2?: SimpleWeatherData.Props;


    /**
     * Specify additional weather data.
     *
     * @type SimpleWeatherData
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SimpleWeatherData.Props)
    readonly simpleWeatherData3?: SimpleWeatherData.Props;


    /**
     * Specify weather forecast data for particular time frames.
     *
     * @type TimeFrameForecastData
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => TimeFrameForecastData.Props)
    readonly timeFrameForecastData?: TimeFrameForecastData.Props[];
}
