import {IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {MenuItemStatus} from "../enums";

/**
 * Represents a single value that can be selected in the dropdown menu.
 */
export class MenuItem
{
    /**
     * Specify the way the menu item is displayed to users.
     *
     * @type MenuItemStatus
     */
    @IsEnum(MenuItemStatus)
    @IsOptional()
    readonly status?: MenuItemStatus;


    /**
     * Specify the text that will be inscribed onto the menu item for description.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly displayText?: string;


    /**
     * Specify additional information about the menu item which can then be used to alter the way the menu item is displayed to users.
     */
    @IsString({each: true})
    @IsOptional()
    readonly context?: string[];
}
