import {ComponentName, ComponentProps} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type ReactNode} from "react";
import {DataListDisplayPanel} from "../classes";
import type {DataListControlButton} from "../types";
import {type DataListStyle} from "./style";

@ComponentName("Data List")
export class DataListProps extends ComponentProps<DataListStyle>
{
    /**
     * Specify the content of the data list.
     */
    @IsOptional()
    readonly children?: ReactNode;


    /**
     * This option is used to convey temporary messages to users.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DataListDisplayPanel)
    readonly displayPanel?: DataListDisplayPanel;


    /**
     * Specify button 1.
     */
    readonly button1: DataListControlButton;


    /**
     * Specify button 2.
     */
    readonly button2: DataListControlButton;


    /**
     * Specify button 3.
     */
    readonly button3: DataListControlButton;
}
