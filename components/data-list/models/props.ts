import {ComponentName, ComponentProps, IsDefined} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type ReactElement} from "react";
import {DataListControlButton, DataListDisplayPanel} from "../classes";
import {type DataListStyle} from "./style";

@ComponentName("Data List")
export class DataListProps extends ComponentProps<DataListStyle>
{
    /**
     * Specify the content of the data list.
     */
    @IsOptional()
    readonly children?: ReactElement;


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
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly button1: DataListControlButton;


    /**
     * Specify button 2.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly button2: DataListControlButton;


    /**
     * Specify button 3.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly button3: DataListControlButton;
}
