import {GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";

export type ControlButton = {
    icon?: IconName;
    text?: string;
    disabled?: boolean;
    onPress?: GestureResponderEventHandler;
}
