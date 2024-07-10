import {ComponentName, ComponentProps, IsBoolean, IsInteger, Min} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import ReactNative from "react-native";
import {type ScrollViewStyle} from "./style";

@ComponentName("Scroll View")
export class ScrollViewProps extends ComponentProps<ScrollViewStyle>
{
    /**
     * Specify the content of the scroll view.
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * @see https://reactnative.dev/docs/scrollview#horizontal
     */
    @IsBoolean()
    @IsOptional()
    readonly horizontal?: boolean;


    /**
     * @see https://reactnative.dev/docs/scrollview#stickyheaderindices
     */
    @Min(0, {each: true})
    @IsInteger({each: true})
    @IsOptional()
    readonly stickyHeaderIndices?: number[];


    /**
     * @see https://reactnative.dev/docs/scrollview#contentinsetadjustmentbehavior-ios
     */
    @IsOptional()
    readonly contentInsetAdjustmentBehavior?: ReactNative.ScrollViewProps["contentInsetAdjustmentBehavior"];


    /**
     * @see https://reactnative.dev/docs/scrollview#showsverticalscrollindicator
     */
    @IsBoolean()
    @IsOptional()
    readonly showsVerticalScrollIndicator?: boolean;


    /**
     * @see https://reactnative.dev/docs/scrollview#showshorizontalscrollindicator
     */
    @IsBoolean()
    @IsOptional()
    readonly showsHorizontalScrollIndicator?: boolean;


    /**
     * @see https://reactnative.dev/docs/scrollview#automaticallyadjustkeyboardinsets-ios
     */
    @IsBoolean()
    @IsOptional()
    readonly automaticallyAdjustKeyboardInsets?: boolean;


    /**
     * @see https://reactnative.dev/docs/scrollview#refreshcontrol
     */
    @IsOptional()
    readonly refreshControl?: ReactNative.ScrollViewProps["refreshControl"];
}
