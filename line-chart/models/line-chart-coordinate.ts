import {IsDefined, IsNumber} from "@miniskylab/antimatter/validation";

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
