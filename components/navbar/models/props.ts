import {ArrayNotEmpty, ComponentName, ComponentProps, IsArray} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "@miniskylab/antimatter-nav-button";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import type {TabData} from "../types";
import {type NavbarStyle} from "./style";

@ComponentName("Navigation Bar")
export class NavbarProps extends ComponentProps<NavbarStyle>
{
    /**
     * Specify all navigation buttons of the navigation bar.
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NavButtonProps)
    readonly tabs?: TabData[];
}
