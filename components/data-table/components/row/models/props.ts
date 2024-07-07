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
     * Specify the reference to the parent component which contains the row. That reference is used to calculate which direction to open the
     * context menu.
     */
    @IsOptional()
    readonly containerRef?: RefObject<View | ScrollView>;


    /**
     * Specify the data of the row.
     */
    @IsOptional()
    readonly data?: Data;


    /**
     * Specify the properties of each cell of the row.
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => Column)
    readonly columns?: Column[];


    /**
     * Specify the way the row operates or behaves.
     *
     * @type Mode
     */
    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    /**
     * Specify the piece of code that will be executed when users press the row.
     */
    readonly onPress?: GestureResponderEventHandler;


    /**
     * Specify the piece of code that will be executed when data of the row changes.
     */
    readonly onChange?: (newData: Data) => void;
}
