import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Data} from "../classes";
import {Mode} from "../enums";
import {Tag} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly id: string;
    readonly name?: string;
    readonly recurrencePattern?: string;
    readonly recurrencePatternPlaceholder?: string;
    readonly notificationInterval?: number;
    readonly notificationIntervalPlaceholder?: string;
    readonly maxSelectedTagCount?: number;
    readonly showProgressStripes?: boolean;
    readonly toBeDeleted?: boolean;
    readonly tags?: Record<string, Tag>;
    readonly modifiedDate?: Date;
    readonly createdDate?: Date;
    readonly mode?: Mode;
    readonly onPress?: GestureResponderEventHandler;
    readonly onChange?: (newReminderData: Data) => void;
}
