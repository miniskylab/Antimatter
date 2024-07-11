import {IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";

/**
 * Represents properties of a group of cells aligned vertically in the data table.
 */
export class Column
{
    /**
     * Specify the text that will be used for identification or description of the column.
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * Specify the text that will be displayed in the empty cells of the column.
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;
}
