import {IsDefined, IsNotEmpty, IsPositive, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export abstract class AbstractTag
{
    /**
     * Specify the name of the tag.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * Specify the icon associated with the tag.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * Specify the order of the tag.
     */
    @IsPositive()
    @IsOptional()
    readonly order?: number;
}
