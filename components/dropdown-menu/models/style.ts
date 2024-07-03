import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DropdownMenuProps} from "./props";

export type DropdownMenuStyle = (dropdownMenuProps: WithoutStyle<DropdownMenuProps>) => {
    Root: ViewStyle;
    SelectedItemContainer: PressableStyle;
    SelectedItem: TextStyle;
    Placeholder: TextStyle;
    Caret: ViewStyle;
    Menu: ScrollViewStyle;
    Divider: ViewStyle;
    MenuItem: ButtonStyle;
};
