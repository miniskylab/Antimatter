import {ComponentName, ComponentProps, IsBoolean, IsInteger, Min} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type ReactNode} from "react";
import ReactNative from "react-native";
import {type ScrollViewStyle} from "./style";

@ComponentName("Scroll View")
export class ScrollViewProps extends ComponentProps<ScrollViewStyle>
{
    @IsOptional()
    readonly children?: ReactNode;


    @IsBoolean()
    @IsOptional()
    readonly horizontal?: boolean;


    @Min(0, {each: true})
    @IsInteger({each: true})
    @IsOptional()
    readonly stickyHeaderIndices?: number[];


    @IsOptional()
    readonly contentInsetAdjustmentBehavior?: ReactNative.ScrollViewProps["contentInsetAdjustmentBehavior"];


    @IsBoolean()
    @IsOptional()
    readonly showsVerticalScrollIndicator?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly showsHorizontalScrollIndicator?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly automaticallyAdjustKeyboardInsets?: boolean;


    @IsOptional()
    readonly keyboardShouldPersistTaps?: ReactNative.ScrollViewProps["keyboardShouldPersistTaps"];


    @IsOptional()
    readonly refreshControl?: ReactNative.ScrollViewProps["refreshControl"];
}
