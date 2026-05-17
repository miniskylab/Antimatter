import {type GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export type ControlButton = {
    label?: string;
    icon?: DefaultIconSet;
    onPress?: GestureResponderEventHandler;
}
