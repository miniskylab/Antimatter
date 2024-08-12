import {ComponentProps} from "@miniskylab/antimatter-framework";
import {ProgressStripesStyle} from "./style";

export type ProgressStripesProps = ComponentProps<ProgressStripesStyle> & {
    readonly msAnimationDuration?: number;
}
