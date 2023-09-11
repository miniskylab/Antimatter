import {ButtonStyle} from "@miniskylab/antimatter-button";
import {ComponentProps, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsDefined, IsOptional} from "class-validator";
import {CtaTarget} from "../enums";

export class Cta extends ComponentProps<ButtonStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly label?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type IconName
     */
    @IsEnum(IconName)
    @IsOptional()
    readonly icon?: IconName;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly href: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type CtaTarget
     */
    @IsEnum(CtaTarget)
    @IsDefined()
    readonly openIn: CtaTarget;
}
