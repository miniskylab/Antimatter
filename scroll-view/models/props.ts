import {ComponentName, ComponentProps, IsBoolean, IsInteger, Min} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {ReactNode} from "react";
import ReactNative from "react-native";
import {ScrollViewStyle} from "./style";

@ComponentName("Scroll View")
export class ScrollViewProps extends ComponentProps<ScrollViewStyle>
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
    readonly horizontal?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Min(0, {each: true})
    @IsInteger({each: true})
    @IsOptional()
    readonly stickyHeaderIndices?: number[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly contentInsetAdjustmentBehavior?: ReactNative.ScrollViewProps["contentInsetAdjustmentBehavior"];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showsVerticalScrollIndicator?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showsHorizontalScrollIndicator?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly automaticallyAdjustKeyboardInsets?: boolean;
}
