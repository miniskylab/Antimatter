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
import {DataListOperationMode} from "@miniskylab/data-list";
import {IsOptional} from "class-validator";
import {Data, Tag} from "../classes";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the text that will be used to uniquely identify the reminder.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the text that will be used for identification or description of the reminder.
     */
    @IsString()
    @IsOptional()
    readonly name?: string;


    /**
     * Specify the maximum number of tags that can be assigned to the reminder.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    /**
     * Set this option to ***true*** to display the progress striped animation in the background of the reminder.
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;


    /**
     * Set this option to ***true*** to specify that the reminder is waiting to be deleted from the todo list.
     */
    @IsBoolean()
    @IsOptional()
    readonly toBeDeleted?: boolean;


    /**
     * Specify the tags that can be assigned to the reminder.
     */
    @IsOptional()
    readonly tags?: Record<string, Tag>;


    /**
     * Specify the date and time at which the reminder was last modified.
     */
    @IsDate()
    @IsOptional()
    readonly modifiedDate?: Date;


    /**
     * Specify the date and time at which the reminder was created.
     */
    @IsDate()
    @IsOptional()
    readonly createdDate?: Date;


    /**
     * Specify the way the reminder operates or behaves.
     *
     * @type DataListOperationMode
     */
    @IsEnum(DataListOperationMode)
    @IsOptional()
    readonly mode?: DataListOperationMode;


    /**
     * Specify the piece of code that will be executed when users press the reminder.
     */
    readonly onPress?: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when data of the reminder changes.
     */
    readonly onChange?: (newReminderData: Data) => void;
}
