import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {MouseEventHandler} from "react";

@ComponentName("Controls")
export class ControlsComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onTodayButtonClicked?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectionButtonClicked?: MouseEventHandler;
}
