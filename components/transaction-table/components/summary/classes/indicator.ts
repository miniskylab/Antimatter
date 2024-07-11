import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";

/**
 * Represents objects that carry indicator data.
 */
export class Indicator
{
    /**
     * Specify the icon that will be inscribed onto the indicator.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Specify the text that will be inscribed onto the indicator.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;
}
