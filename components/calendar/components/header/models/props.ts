import {ComponentProps, GestureResponderEventHandler, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsString()
    @IsOptional()
    readonly headline?: string;

    readonly onPrevPress?: GestureResponderEventHandler;
    readonly onNextPress?: GestureResponderEventHandler;
    readonly onHeadlinePress?: GestureResponderEventHandler;
}
