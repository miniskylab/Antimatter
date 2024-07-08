import {ComponentName, ComponentProps, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {MenuItem} from "../classes";
import {DropDirection} from "../enums";
import {type DropdownMenuStyle} from "./style";

@ComponentName("Dropdown Menu")
export class DropdownMenuProps extends ComponentProps<DropdownMenuStyle>
{
    /**
     * Specify all possible values for users to select from.
     */
    @IsOptional()
    readonly menuItems?: Record<string, MenuItem>;


    /**
     * Specify the text that will be displayed before any values have been selected.
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * Set this option to ***true*** to open the menu allowing users to select one or more values from.
     */
    @IsBoolean()
    @IsOptional()
    readonly isOpen?: boolean;


    /**
     * Set this option to ***true*** to allow users to scroll through the menu horizontally.
     */
    @IsBoolean()
    @IsOptional()
    readonly enableMenuHorizontalScrolling?: boolean;


    /**
     * Specify the direction to open the menu in.
     *
     * @type DropDirection
     */
    @IsEnum(DropDirection)
    @IsOptional()
    readonly dropDirection?: DropDirection;


    /**
     * Specify the piece of code that will be executed when users press the selected item container to open or close the menu.
     */
    readonly onSelectedItemContainerPress?: () => void;


    /**
     * Specify the piece of code that will be executed when users press an item in the opened menu.
     */
    readonly onMenuItemPress?: (pressedMenuItemKey: string) => void;
}
