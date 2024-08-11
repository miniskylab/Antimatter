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
    IsString,
    Min
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


    @IsString()
    @IsOptional()
    readonly recurrencePattern?: string;


    @Min(0)
    @IsNumber()
    @IsOptional()
    readonly notificationIntervalInHours?: number;


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
    @IsOptional()
    readonly modifiedDate?: Date;


    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;


    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    readonly onPress?: GestureResponderEventHandler;


    readonly onChange?: (newReminderData: Data) => void;
}
