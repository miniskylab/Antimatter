import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import {type PressableStyle} from "./style";

@ComponentName("Pressable")
export class PressableProps extends ComponentProps<PressableStyle>
{
    /**
     * @see https://reactnative.dev/docs/pressable#children
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * @see https://reactnative.dev/docs/pressable#disabled
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * @see https://reactnative.dev/docs/pressable#onpress
     */
    readonly onPress?: GestureResponderEventHandler;
}
