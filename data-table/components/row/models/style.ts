import {DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ToggleStyle} from "@miniskylab/antimatter-toggle";
import {Props} from "./props";

export type Style = (rowProps: Styled<Props>) => {
    Root?: PressableStyle;
    CellDropdownMenu?: DropdownMenuStyle;
    CellToggle?: ToggleStyle;
    CellInputField?: InputFieldStyle;
    CellLabel?: LabelStyle;
    CellIcon?: IconStyle;
};
