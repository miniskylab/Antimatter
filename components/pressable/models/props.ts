import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import {type PressableStyle} from "./style";

@ComponentName("Pressable")
export class PressableProps extends ComponentProps<PressableStyle>
{
    /**
     * Either children or a function that receives a boolean reflecting whether the component is currently pressed.
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * Whether the press behavior is disabled.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * Called after `onPressOut`.
     */
    readonly onPress?: GestureResponderEventHandler;
}
