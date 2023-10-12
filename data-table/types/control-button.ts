import {GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export type ControlButton = {
    icon?: DefaultIconSet;
    text?: string;
    disabled?: boolean;
    onPress?: GestureResponderEventHandler;
}
