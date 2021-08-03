import {IsDefined, IsNumber} from "antimatter/validation";

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
