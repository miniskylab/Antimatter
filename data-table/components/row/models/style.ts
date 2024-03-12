import {DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ToggleStyle} from "@miniskylab/antimatter-toggle";
import {Props} from "./props";
import {State} from "./state";

export type Style = (rowProps: WithoutStyle<Props>, rowState: State) => {
    Root: PressableStyle;
    CellDropdownMenu: DropdownMenuStyle;
    CellToggle: ToggleStyle;
    CellInputField: InputFieldStyle;
    CellLabel: TextStyle;
    CellIcon: IconStyle;
};
