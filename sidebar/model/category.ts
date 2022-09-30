import {ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
import {MenuItem} from "./menu-item";

export class Category
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ArrayNotEmpty()
    @IsArray()
    @IsDefined()
    @ValidateNested({each: true})
    @Type(() => MenuItem)
    readonly menuItems: MenuItem[];
}
