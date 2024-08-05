import {IsBoolean, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {DataListDisplayPanelTheme} from "../enums";

/**
 * Represents objects that carry display panel data.
 */
export class DataListDisplayPanel
{
    /**
     * Specify the icon that will be inscribed onto the display panel.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text message that will be inscribed onto the display panel.
     */
    @IsString()
    @IsDefined()
    readonly message: string;


    /**
     * Specify the overall appearance of the display panel.
     *
     * @type DataListDisplayPanelTheme
     */
    @IsEnum(DataListDisplayPanelTheme)
    @IsOptional()
    readonly theme?: DataListDisplayPanelTheme;


    /**
     * Set this option to ***true*** to play the animation associated with the icon inscribed onto the display panel.
     */
    @IsBoolean()
    @IsOptional()
    readonly isIconAnimationPlaying?: boolean;


    /**
     * Set this option to ***true*** to make the display panel visible to users.
     */
    @IsBoolean()
    @IsOptional()
    readonly isVisible?: boolean;
}
