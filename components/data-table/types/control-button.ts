import {GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export type ControlButton = {
    text?: string;
    icon?: DefaultIconSet;
    onPress?: GestureResponderEventHandler;
}
