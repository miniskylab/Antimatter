import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Data} from "../classes";
import {Mode} from "../enums";
import {Tag} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly id: string;
    readonly name?: string;
    readonly namePlaceholder?: string;
    readonly amount: number;
    readonly maxSelectedTagCount?: number;
    readonly showProgressStripes?: boolean;
    readonly isToBeDeleted?: boolean;
    readonly tags?: Record<string, Tag>;
    readonly executedDate: Date;
    readonly modifiedDate?: Date;
    readonly createdDate?: Date;
    readonly mode?: Mode;
    readonly onPress?: GestureResponderEventHandler;
    readonly onChange?: (newTransactionData: Partial<Data>) => void;
}
