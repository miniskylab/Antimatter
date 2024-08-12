import {ComponentProps} from "@miniskylab/antimatter-framework";
import type {YearInfo} from "../types";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly selectedYear?: number;
    readonly data?: YearInfo[];
    readonly onYearPress?: (year: number) => void;
}
