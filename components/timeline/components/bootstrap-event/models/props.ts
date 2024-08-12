import {ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly description: string;
}
