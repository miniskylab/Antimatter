import {IsBoolean, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {MenuItem} from "./menu-item";

@ComponentName("Dropdown Menu")
export class DropdownMenuProps extends ComponentProps
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
    readonly isOpenByDefault?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly containerClassName?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: (clickedMenuItemValue: string) => void;
}
