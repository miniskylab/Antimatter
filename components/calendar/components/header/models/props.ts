import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly headline?: string;
    readonly onPrevPress?: GestureResponderEventHandler;
    readonly onNextPress?: GestureResponderEventHandler;
    readonly onHeadlinePress?: GestureResponderEventHandler;
}
