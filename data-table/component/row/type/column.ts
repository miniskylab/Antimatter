import {IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

export class Column
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;
}
