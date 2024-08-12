import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly headline?: string;
    readonly onPrevPress?: GestureResponderEventHandler;
    readonly onNextPress?: GestureResponderEventHandler;
    readonly onHeadlinePress?: GestureResponderEventHandler;
}
