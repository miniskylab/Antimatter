import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {LabelProps} from "@miniskylab/antimatter/label";
import {IsArray, IsInteger, IsPositive, IsString} from "@miniskylab/antimatter/validation";
import {IsOptional, ValidateNested} from "class-validator";
import {RecordProps} from "../components/record";

@ComponentName("Data Table")
export class DataTableComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsArray()
    @IsOptional()
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
    @ValidateNested()
    @IsArray()
    @IsOptional()
    readonly records?: RecordProps[];


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
