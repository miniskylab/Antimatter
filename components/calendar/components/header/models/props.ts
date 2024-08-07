import {ComponentProps, GestureResponderEventHandler, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the text that will be displayed at the top of the calendar describing what time frame the calendar is showing.
     */
    @IsString()
    @IsOptional()
    readonly headline?: string;


    /**
     * Specify the piece of code that will be executed when users nagivate backward.
     */
    readonly onPrevPress?: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when users nagivate forward.
     */
    readonly onNextPress?: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when users press the headline.
     */
    readonly onHeadlinePress?: GestureResponderEventHandler;
}
