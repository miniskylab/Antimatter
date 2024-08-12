import {IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export class MenuItem
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly label: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly url: string;
}
