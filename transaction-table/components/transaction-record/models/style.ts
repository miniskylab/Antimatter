import {DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ProgressStripesStyle} from "@miniskylab/antimatter-motion-graphics";
import {NumericInputFieldStyle} from "@miniskylab/antimatter-numeric-input-field";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (transactionRecordProps: WithoutStyle<Props>) => {
    Root: PressableStyle;
    Icon: IconStyle;
    NameAndTagContainer: ViewStyle;
    NameInputField: InputFieldStyle;
    NameLabel: LabelStyle;
    AmountInputField: NumericInputFieldStyle;
    AmountLabel: LabelStyle;
    TagSelector: DropdownMenuStyle;
    TagContainer: ViewStyle;
    Tag: LabelStyle;
    ProgressStripes: ProgressStripesStyle;
};
