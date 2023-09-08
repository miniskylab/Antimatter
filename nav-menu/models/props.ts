import {ComponentName, ComponentProps, IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Category} from "../types";
import {NavMenuStyle} from "./style";

@ComponentName("NavMenu")
export class NavMenuProps extends ComponentProps<NavMenuStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly selectedUrl: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => Category)
    readonly categories?: Category[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onMenuItemPress?: (targetUrl: string) => void;
}
