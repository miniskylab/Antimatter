import {IsDefined, IsNumber} from "@miniskylab/antimatter-class-validator";

export class LineChartCoordinate
{
    /**
     *
     */
    @IsNumber()
    @IsDefined()
    x: number;


    /**
     *
     */
    @IsNumber()
    @IsDefined()
    y: number;
}
