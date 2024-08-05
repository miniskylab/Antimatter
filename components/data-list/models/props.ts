import {ComponentName, ComponentProps, IsEnum} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type ReactNode} from "react";
import {DataListDisplayPanel} from "../classes";
import {DataListOperationMode} from "../enums";
import type {ControlButton} from "../types";
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
     * Specify the way the data list operates or behaves.
     *
     * @type DataListOperationMode
     */
    @IsEnum(DataListOperationMode)
    @IsOptional()
    readonly mode?: DataListOperationMode;


    /**
     * Specify the button that users can press to add a new item to the data list.
     */
    readonly addNewButton: ControlButton;


    /**
     * Specify the button that users can press to save all changes made to the selected item in the data list.
     */
    readonly saveButton: ControlButton;


    /**
     * Specify the button that users can press to delete the selected item from the data list.
     */
    readonly deleteButton: ControlButton;


    /**
     * Specify the button that users can press to discard all changes made to the selected item in the data list.
     */
    readonly cancelButton: ControlButton;


    /**
     * Specify the button that users can press to trigger custom functionalities.
     */
    readonly customButton?: ControlButton;


    /**
     * Specify the piece of code that will be executed when the data list changes mode.
     */
    readonly onSwitchMode?: (newMode: DataListOperationMode) => void;
}
