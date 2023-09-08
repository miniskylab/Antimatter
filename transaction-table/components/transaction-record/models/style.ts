import {DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {NumericInputFieldStyle} from "@miniskylab/antimatter-numeric-input-field";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (transactionRecordProps: Styled<Props>) => {
    Root?: PressableStyle;
    Icon?: IconStyle;
    NameAndLabelContainer?: ViewStyle;
    NameInputField?: InputFieldStyle;
    NameLabel?: LabelStyle;
    AmountInputField?: NumericInputFieldStyle;
    AmountLabel?: LabelStyle;
    LabelSelector?: DropdownMenuStyle;
    LabelContainer?: ViewStyle;
    Label?: LabelStyle;
};
