import {ComponentName, ComponentProps} from "@miniskylab/antimatter/infrastructure";
import {IsArray, IsInteger, IsPositive, IsString} from "@miniskylab/antimatter/validation";
import {IsOptional, ValidateNested} from "class-validator";
import {DataTableAddNewRow} from "./data-table-add-new-row";
import {DataTableRow} from "./data-table-row";

@ComponentName("Data Table")
export class DataTableComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsArray()
    @IsOptional()
    readonly rows?: DataTableRow[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    readonly headerRow?: DataTableRow;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly selectedRowId?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsOptional()
    readonly addNewRow?: DataTableAddNewRow;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly rowCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly maxColumnCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly pxMinColumnWidth?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onRowClicked?: (rowId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveButtonClicked?: (rowId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancelButtonClicked?: (rowId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteButtonClicked?: (rowId: string) => void;
}
