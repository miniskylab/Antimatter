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
import {Data, Tag} from "../classes";
import {Mode} from "../enums";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    @IsString()
    @IsOptional()
    readonly name?: string;


    @IsNumber()
    @IsDefined()
    readonly amount: number;


    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly toBeDeleted?: boolean;


    @IsOptional()
    readonly tags?: Record<string, Tag>;


    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;


    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    readonly onPress?: GestureResponderEventHandler;
    readonly onChange?: (newTransactionData: Data) => void;
}
