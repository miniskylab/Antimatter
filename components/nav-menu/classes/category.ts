import {IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MenuItem} from "./menu-item";

export class Category
{
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => MenuItem)
    readonly menuItems: MenuItem[];
}
