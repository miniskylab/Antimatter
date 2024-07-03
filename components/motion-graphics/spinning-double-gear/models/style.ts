import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {SpinningDoubleGearProps} from "./props";

export type SpinningDoubleGearStyle = (spinningDoubleGearProps: WithoutStyle<SpinningDoubleGearProps>) => {
    Root: ViewStyle;
    GearContainer: ViewStyle;
    Gear1: IconStyle;
    Gear2: IconStyle;
};
