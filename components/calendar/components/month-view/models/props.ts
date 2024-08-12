import {ComponentProps} from "@miniskylab/antimatter-framework";
import type {MonthInfo} from "../types";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly selectedMonth?: Date;
    readonly data?: MonthInfo[];
    readonly onMonthPress?: (month: Date) => void;
}
