import {ComponentName, ComponentProps, type GestureResponderEventHandler, IsBoolean, IsInteger} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import ReactNative from "react-native";
import {type PressableStyle} from "./style";

@ComponentName("Pressable")
export class PressableProps extends ComponentProps<PressableStyle>
{
    @IsOptional()
    readonly children?: ReactNode;


    @IsInteger()
    @IsOptional()
    readonly tabIndex?: ReactNative.PressableProps["tabIndex"];


    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    @IsOptional()
    readonly onPress?: GestureResponderEventHandler;
}
