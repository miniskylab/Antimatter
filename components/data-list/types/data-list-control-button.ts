import {GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export type DataListControlButton = {
    text: string;
    icon: DefaultIconSet;
    disabled?: boolean;
    onPress?: GestureResponderEventHandler;
}
