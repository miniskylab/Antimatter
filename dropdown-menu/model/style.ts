import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DropdownMenuProps} from "./props";

export type DropdownMenuStyle = (dropdownMenuProps: Styled<DropdownMenuProps>) => {
    Root?: PressableStyle;
    SelectedItem?: LabelStyle;
    Placeholder?: LabelStyle;
    Caret?: ViewStyle;
    Menu?: ViewStyle;
    Divider?: ViewStyle;
    MenuItem?: ButtonStyle;
};
