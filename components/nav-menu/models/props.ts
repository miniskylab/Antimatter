import {ComponentName, ComponentProps, IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Category} from "../classes";
import {type NavMenuStyle} from "./style";

@ComponentName("Navigation Menu")
export class NavMenuProps extends ComponentProps<NavMenuStyle>
{
    /**
     * Specify the selected menu item by its URL.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly selectedUrl: string;


    /**
     * Specify the groups among which all URLs might be distributed.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => Category)
    readonly categories?: Category[];


    /**
     * Specify the piece of code that will be executed when users press a menu item in the navigation menu.
     */
    readonly onMenuItemPress?: (targetUrl: string) => void;
}
