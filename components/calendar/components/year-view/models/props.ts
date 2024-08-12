import {ComponentProps} from "@miniskylab/antimatter-framework";
import {YearInfo} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly selectedYear?: number;
    readonly data?: YearInfo[];
    readonly onYearPress?: (year: number) => void;
}
