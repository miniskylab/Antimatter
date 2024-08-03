import {ComponentProps, IsDefined, IsNotEmpty, IsNumber, IsString, Max, Min} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Indicator} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the text that will be used for identification or description of section 1 of the summary.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section1Label: string;


    /**
     * Specify the text value associated with section 1 of the summary.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section1Value: string;


    /**
     * Specify the text that will be used for identification or description of section 2 of the summary.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section2Label: string;


    /**
     * Specify the text value associated with section 2 of the summary.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly section2Value: string;


    /**
     * Specify what will be displayed in the indicator section of the summary.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Indicator)
    readonly indicator?: Indicator;


    /**
     * Specify the value of the progress bar of the summary.
     */
    @Min(0)
    @Max(1)
    @IsNumber()
    @IsOptional()
    readonly progressBarValue?: number;
}
