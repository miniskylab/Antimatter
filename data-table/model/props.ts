import {IsArray, IsInteger, IsPositive, IsString} from "@miniskylab/antimatter-class-validator";
import {LabelProps} from "@miniskylab/antimatter-label";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Record} from "../components";

@ComponentName("Data Table")
export class DataTableProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => LabelProps)
    readonly headerRowCells?: LabelProps[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly addNewRowText?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => Record.Props)
    readonly records?: Record.Props[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly selectedRecordId?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly rowCountPerPage?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly maxPageCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly pxMinPageWidth?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRowClick?: (rowId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRecordSave?: (recordId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRecordDraftDiscard?: (recordId: number | string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRecordDelete?: (recordId: number | string) => void;
}
