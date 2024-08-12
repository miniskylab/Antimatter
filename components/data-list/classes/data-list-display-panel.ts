import {IsBoolean, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {DataListDisplayPanelTheme} from "../enums";

export class DataListDisplayPanel
{
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsString()
    @IsDefined()
    readonly message: string;


    @IsEnum(DataListDisplayPanelTheme)
    @IsOptional()
    readonly theme?: DataListDisplayPanelTheme;


    @IsBoolean()
    @IsOptional()
    readonly isIconAnimationPlaying?: boolean;


    @IsBoolean()
    @IsOptional()
    readonly isVisible?: boolean;
}
