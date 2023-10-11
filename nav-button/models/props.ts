import {ComponentName, ComponentProps, IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
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
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Target
     */
    @IsEnum(Target)
    @IsDefined()
    readonly openIn: Target;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
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
    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;
}