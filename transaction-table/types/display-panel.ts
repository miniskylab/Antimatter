import {IsBoolean, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {DisplayPanelTheme} from "../enums";

export class DisplayPanel
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly message: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DisplayPanelTheme
     */
    @IsEnum(DisplayPanelTheme)
    @IsOptional()
    readonly theme?: DisplayPanelTheme;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isIconAnimationPlaying?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isVisible?: boolean;
}
