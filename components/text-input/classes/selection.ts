import {IsDefined, IsNumber} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

/**
 * Represents a text selection.
 */
export class Selection
{
    /**
     * Specify the start of the text selection.
     */
    @IsNumber()
    @IsDefined()
    readonly start: number;


    /**
     * Specify the end of the text selection.
     */
    @IsNumber()
    @IsOptional()
    readonly end?: number;
}
