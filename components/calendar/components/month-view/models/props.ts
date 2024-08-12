import {ComponentProps} from "@miniskylab/antimatter-framework";
import {MonthInfo} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly selectedMonth?: Date;
    readonly data?: MonthInfo[];
    readonly onMonthPress?: (month: Date) => void;
}
