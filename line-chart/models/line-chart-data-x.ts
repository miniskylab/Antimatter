import {IsDefined, IsHexColor, IsString} from "antimatter/validation";
import {IsOptional} from "class-validator";

export class LineChartDataX
{
    /**
     *
     */
    @IsString()
    @IsDefined()
    readonly value: string;


    /**
     *
     */
    @IsHexColor()
    @IsString()
    @IsOptional()
    readonly gridColor?: string;
}
