import {ArrayNotEmpty, ComponentProps, GestureResponderEventHandler, IsArray, IsEnum} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {View} from "@miniskylab/antimatter-view";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type RefObject} from "react";
import {Column} from "../classes";
import {Mode} from "../enums";
import type {Data} from "../types";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly containerRef?: RefObject<View | ScrollView>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly data?: Data;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => Column)
    readonly columns?: Column[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Mode
     */
    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onPress?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newData: Data) => void;
}
