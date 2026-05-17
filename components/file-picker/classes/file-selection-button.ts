import {IsBoolean, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";

export class FileSelectionButton
{
    @IsString()
    @IsDefined()
    readonly label: string;


    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}
