import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly onTodayButtonPress?: GestureResponderEventHandler;
    readonly onSelectionButtonPress?: GestureResponderEventHandler;
}
