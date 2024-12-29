import {ComponentName, ComponentProps, GestureResponderEventHandler, IsBoolean} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import {type PressableStyle} from "./style";

@ComponentName("Pressable")
export class PressableProps extends ComponentProps<PressableStyle>
{
    @IsOptional()
    readonly children?: ReactNode;


    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    @IsOptional()
    readonly onPress?: GestureResponderEventHandler;
}
