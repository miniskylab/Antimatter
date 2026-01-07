import {IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {HighlightColor} from "../enums";

export class WindData
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly speedAndGusts: string;


    @Max(360)
    @Min(0)
    @IsNumber()
    @IsDefined()
    readonly direction: number;


    @IsEnum(HighlightColor)
    @IsOptional()
    readonly highlightColor?: HighlightColor;
}
