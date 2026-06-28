import {IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export class FileSelectionButton
{
    @IsString()
    @IsDefined()
    readonly label: string;


    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;
}
