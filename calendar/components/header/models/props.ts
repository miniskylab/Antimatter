import {ComponentProps, GestureResponderEventHandler, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly headline?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPrevPress?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onNextPress?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onHeadlinePress?: GestureResponderEventHandler;
}
