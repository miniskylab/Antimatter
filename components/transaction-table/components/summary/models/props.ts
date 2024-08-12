import {ComponentProps, IsDefined, IsNotEmpty, IsNumber, IsString, Max, Min} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Indicator} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section1Label: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section1Value: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section2Label: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section2Value: string;


    @IsOptional()
    @ValidateNested()
    @Type(() => Indicator)
    readonly indicator?: Indicator;


    @Min(0)
    @Max(1)
    @IsNumber()
    @IsOptional()
    readonly progressBarValue?: number;
}
