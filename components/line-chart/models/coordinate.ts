import {IsDefined, IsNumber} from "@miniskylab/antimatter-class-validator";

export class Coordinate
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
