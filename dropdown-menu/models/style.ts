import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DropdownMenuProps} from "./props";

export type DropdownMenuStyle = (dropdownMenuProps: WithoutStyle<DropdownMenuProps>) => {
    Root?: ViewStyle;
    SelectedItemContainer?: PressableStyle;
    SelectedItem?: LabelStyle;
    Placeholder?: LabelStyle;
    Caret?: ViewStyle;
    Menu?: ScrollViewStyle;
    Divider?: ViewStyle;
    MenuItem?: ButtonStyle;
};
