import {ComponentName, ComponentProps, LayoutChangeEventHandler, PointerEvents} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import {ViewStyle} from "./style";

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
}
