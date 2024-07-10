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
     * Specify the content of the view.
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * @see https://reactnative.dev/docs/view#pointerevents
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;


    /**
     * @see https://reactnative.dev/docs/view#onlayout
     */
    readonly onLayout?: LayoutChangeEventHandler;


    /**
     * @see https://reactnative.dev/docs/view#onstartshouldsetresponder
     */
    readonly onStartShouldSetResponder?: ShouldSetResponderPredicate;


    /**
     * @see https://reactnative.dev/docs/view#onmoveshouldsetresponder
     */
    readonly onMoveShouldSetResponder?: ShouldSetResponderPredicate;


    /**
     * @see https://reactnative.dev/docs/view#onresponderstart
     */
    readonly onResponderStart?: GestureResponderEventHandler;


    /**
     * @see https://reactnative.dev/docs/view#onrespondermove
     */
    readonly onResponderMove?: GestureResponderEventHandler;
}
