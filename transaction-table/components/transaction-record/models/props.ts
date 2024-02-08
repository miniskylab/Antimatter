import {
    ComponentProps,
    GestureResponderEventHandler,
    IsBoolean,
    IsDate,
    IsDefined,
    IsEnum,
    IsInteger,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Mode} from "../enums";
import type {Data} from "../types";
import {Tag} from "../types";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly amount: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;


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
    readonly onPress?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newTransactionData: Data) => void;
}
