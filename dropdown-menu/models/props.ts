import {ComponentName, ComponentProps, IsBoolean, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {MenuItem} from "../classes";
import {DropDirection} from "../enums";
import {type DropdownMenuStyle} from "./style";

@ComponentName("Dropdown Menu")
export class DropdownMenuProps extends ComponentProps<DropdownMenuStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly menuItems?: Record<string, MenuItem>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly placeholder?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isOpen?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly enableMenuHorizontalScrolling?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DropDirection
     */
    @IsEnum(DropDirection)
    @IsOptional()
    readonly dropDirection?: DropDirection;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectedItemContainerPress?: () => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onMenuItemPress?: (pressedMenuItemKey: string) => void;
}
