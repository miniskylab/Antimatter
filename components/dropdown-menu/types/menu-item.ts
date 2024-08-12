import {MenuItemStatus} from "../enums";

export type MenuItem = {
    readonly status?: MenuItemStatus;
    readonly displayText?: string;
    readonly context?: string[];
}
