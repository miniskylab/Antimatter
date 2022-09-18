import {ArrayNotEmpty, IsArray, IsEnum, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MouseEventHandler} from "react";
import {Column} from "./column";
import {Mode} from "./mode";
import type {RowData} from "./row-data";

export class DataTableRowProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString({each: true})
    @IsOptional()
    readonly values?: (string | boolean)[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => Column)
    readonly columns?: Column[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Mode
     */
    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newRowData: RowData) => void;
}
