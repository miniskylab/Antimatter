import {ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MouseEvent} from "react";
import {Category} from "./category";

@ComponentName("Sidebar")
export class SidebarProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly selectedUrl?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => Category)
    readonly categories: Category[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onNavigate?: (event: MouseEvent, targetUrl: string) => void;
}
