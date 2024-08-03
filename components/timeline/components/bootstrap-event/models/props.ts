import {ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the icon associated with the bootstrap event.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text that will be used for identification of the bootstrap event.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * Specify what happens during the bootstrap event.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly description: string;
}
