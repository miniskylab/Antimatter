import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

/**
 * Represents a single menu item in the navigation menu.
 */
export class MenuItem
{
    /**
     * Specify the icon associated with the menu item.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text that will be used for identification or description of the menu item.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;


    /**
     * Specify the URL associated with the menu item.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly url: string;
}
