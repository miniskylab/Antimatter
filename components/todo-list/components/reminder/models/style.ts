import {DropdownMenuStyle} from "@miniskylab/antimatter-dropdown-menu";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {ProgressStripesStyle} from "@miniskylab/antimatter-motion-graphics";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (reminderProps: WithoutStyle<Props>) => {
    Root: PressableStyle;
    Icon: IconStyle;
    NameAndTagContainer: ViewStyle;
    NameInputField: InputFieldStyle;
    NameText: TextStyle;
    TagSelector: DropdownMenuStyle;
    TagContainer: ViewStyle;
    Tag: TextStyle;
    ProgressStripes: ProgressStripesStyle;
};
