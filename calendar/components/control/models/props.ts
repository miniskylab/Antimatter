import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onTodayButtonPress?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectionButtonPress?: GestureResponderEventHandler;
}
