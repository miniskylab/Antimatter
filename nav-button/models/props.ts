import {ComponentName, ComponentProps, IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Target} from "../enums";
import {NavButtonStyle} from "./style";

@ComponentName("Navigation Button")
export class NavButtonProps extends ComponentProps<NavButtonStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
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
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}
