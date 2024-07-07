import {IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Row} from "../components";

/**
 * A group of cells aligned horizontally and highlighted in the data table.
 */
export class SelectedRow
{
    /**
     * Specify the text that will be used for identification of the selected row.
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the data of the selected row.
     */
    @IsOptional()
    readonly data: Row.Data;
}
