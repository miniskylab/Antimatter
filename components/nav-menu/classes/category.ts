import {IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MenuItem} from "./menu-item";

/**
 * Represents a single group into which URLs might be distributed.
 */
export class Category
{
    /**
     * Specify the text that will be used for identification or description of the category.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;

    /**
     * Specify all URLs in the category.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => MenuItem)
    readonly menuItems: MenuItem[];
}
