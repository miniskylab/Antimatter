import {IsInteger, IsPositive, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {DataTableRow} from "../components";
import {Row} from "./row";

@ComponentName("Data Table")
export class DataTableProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly subTitle?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly headerRow?: DataTableRow.RowData;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly dataRows?: Record<string, DataTableRow.RowData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Row)
    readonly selectedRow?: Row;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsOptional()
    readonly minRowCount?: number;
}
