import {ComponentProps} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly minValue: number;
    readonly maxValue: number;
    readonly step: number;
    readonly startValue?: number;
    readonly endValue?: number;
    readonly milestoneStep?: number;
}
