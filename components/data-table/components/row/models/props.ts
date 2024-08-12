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
    @IsOptional()
    readonly containerRef?: RefObject<View | ScrollView>;


    @IsOptional()
    readonly data?: Data;


    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => Column)
    readonly columns?: Column[];


    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    readonly onPress?: GestureResponderEventHandler;


    readonly onChange?: (newData: Data) => void;
}
