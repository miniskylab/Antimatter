import {IsDefined, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {DataTableRow} from "../components";

export class Row
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly data?: DataTableRow.RowData;
}
