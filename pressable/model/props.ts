import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import {PressableStyle} from "./style";

@ComponentName("Pressable")
export class PressableProps extends ComponentProps<PressableStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPress?: GestureResponderEventHandler;
}
