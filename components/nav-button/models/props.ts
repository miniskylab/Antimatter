import {ComponentName, ComponentProps, IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Target} from "../enums";
import {type NavButtonStyle} from "./style";

@ComponentName("Navigation Button")
export class NavButtonProps extends ComponentProps<NavButtonStyle>
{
    /**
     * Specify the location to which users will be sent when they press the navigation button.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly destination: string;


    /**
     * <b className="property-description__supported-platform-section">
     *     Supported Platforms:
     *     <b className="property-description__supported-platform-value--web">Web</b>
     * </b>
     *
     * Specify where to open the provided destination.
     *
     * @type Target
     */
    @IsEnum(Target)
    @IsOptional()
    readonly openIn?: Target;


    /**
     * Specify the text that will be inscribed onto the navigation button for identification or description.
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * Specify the icon that will be inscribed onto the navigation button.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * Set this option to ***true*** to prevent users from pressing the navigation button.
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}
