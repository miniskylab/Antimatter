import {
    ComponentName,
    ComponentProps,
    type GestureResponderEventHandler,
    type LayoutChangeEventHandler,
    type PointerEvents,
    type ShouldSetResponderPredicate
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import {type ViewStyle} from "./style";

@ComponentName("View")
export class ViewProps extends ComponentProps<ViewStyle>
{
    @IsOptional()
    readonly children?: ReactNode;


    @IsOptional()
    readonly pointerEvents?: PointerEvents;


    @IsOptional()
    readonly onLayout?: LayoutChangeEventHandler;


    @IsOptional()
    readonly onStartShouldSetResponder?: ShouldSetResponderPredicate;


    @IsOptional()
    readonly onMoveShouldSetResponder?: ShouldSetResponderPredicate;


    @IsOptional()
    readonly onResponderStart?: GestureResponderEventHandler;


    @IsOptional()
    readonly onResponderMove?: GestureResponderEventHandler;
}
