import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly onTodayButtonPress?: GestureResponderEventHandler;
    readonly onSelectionButtonPress?: GestureResponderEventHandler;
}
