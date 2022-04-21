import {Props as ButtonProps} from "@miniskylab/antimatter-button";
import {IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsOptional, ValidateIf} from "class-validator";

export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateIf((cardProps: Props) => !cardProps.thisIsPlaceholderCard)
    readonly icon?: IconName;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: Props) => !cardProps.thisIsPlaceholderCard)
    readonly name?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: Props) => !cardProps.thisIsPlaceholderCard)
    readonly description?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly thisIsPlaceholderCard?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    readonly ctaButtons?: ButtonProps[];
}
