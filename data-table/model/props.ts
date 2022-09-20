import {ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsInteger, IsPositive, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MouseEventHandler} from "react";
import {DataTableRow} from "../components";
import {Row} from "./row";

@ComponentName("Data Table")
export class DataTableProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subTitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested()
    @Type(() => DataTableRow.Column)
    readonly columns: DataTableRow.Column[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly rows?: Record<string, DataTableRow.RowData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Row)
    readonly selectedRow?: Row;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DataTableRow.Mode
     */
    @IsEnum(DataTableRow.Mode)
    @IsOptional()
    readonly mode?: DataTableRow.Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly minRowCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSwitchMode: (newMode: DataTableRow.Mode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeRow: (newRowData: DataTableRow.RowData) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectRow: (rowId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onAddNewRow: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveRow: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteRow: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancel: MouseEventHandler;
}
