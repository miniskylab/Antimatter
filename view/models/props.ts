import {
    ComponentName,
    ComponentProps,
    GestureResponderEventHandler,
    LayoutChangeEventHandler,
    type PointerEvents,
    ShouldSetResponderPredicate
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import {type ViewStyle} from "./style";

@ComponentName("View")
export class ViewProps extends ComponentProps<ViewStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onLayout?: LayoutChangeEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onStartShouldSetResponder?: ShouldSetResponderPredicate;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onMoveShouldSetResponder?: ShouldSetResponderPredicate;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onResponderStart?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onResponderMove?: GestureResponderEventHandler;
}
