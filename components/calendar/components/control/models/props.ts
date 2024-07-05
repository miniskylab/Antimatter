import {ComponentProps, GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the piece of code that will be executed when users request the calendar to show the ***today*** date.
     */
    readonly onTodayButtonPress?: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when users request the calendar to show the selected date.
     */
    readonly onSelectionButtonPress?: GestureResponderEventHandler;
}
