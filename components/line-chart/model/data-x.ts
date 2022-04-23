import {IsDefined, IsHexColor, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";

export class DataX
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
