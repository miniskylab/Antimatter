import {ArrayNotEmpty, ComponentName, ComponentProps, IsArray} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "@miniskylab/antimatter-nav-button";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {TabData} from "../types";
import {NavbarStyle} from "./style";

@ComponentName("Navigation Bar")
export class NavbarProps extends ComponentProps<NavbarStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NavButtonProps)
    readonly tabs?: TabData[];
}
