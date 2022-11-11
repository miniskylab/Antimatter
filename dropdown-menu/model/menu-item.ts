import {IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {MenuItemStatus} from "./menu-item-status";

export class MenuItem
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type MenuItemStatus
     */
    @IsEnum(MenuItemStatus)
    @IsOptional()
    readonly status?: MenuItemStatus;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly displayText?: string;
}
