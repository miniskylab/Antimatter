import {GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export type ControlButtonType = "action" | "mode" | "cancel" | "custom";
export type ControlButton = {
    text?: string;
    icon?: DefaultIconSet;
    type?: ControlButtonType;
    onPress?: GestureResponderEventHandler;
}
