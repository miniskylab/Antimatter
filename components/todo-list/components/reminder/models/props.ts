import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Data} from "../classes";
import {Mode, Status} from "../enums";
import {Tag} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly id: string;
    readonly mode?: Mode;
    readonly name?: string;
    readonly recurrencePattern?: string;
    readonly recurrencePatternPlaceholder?: string;
    readonly notificationInterval?: number;
    readonly notificationIntervalPlaceholder?: string;
    readonly maxSelectedTagCount?: number;
    readonly showProgressStripes?: boolean;
    readonly isToBeDeleted?: boolean;
    readonly tags?: Record<string, Tag>;
    readonly status?: Status;
    readonly dueDate?: Date;
    readonly originalData?: Data;
    readonly modifiedDate?: Date;
    readonly createdDate?: Date;
    readonly onPress?: GestureResponderEventHandler;
    readonly onChange?: (newReminderData: Partial<Data>) => void;
}
