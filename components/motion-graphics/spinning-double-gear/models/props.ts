import {ComponentProps} from "@miniskylab/antimatter-framework";
import {SpinningDoubleGearStyle} from "./style";

export type SpinningDoubleGearProps = ComponentProps<SpinningDoubleGearStyle> & {
    readonly msAnimationDuration?: number;
}
