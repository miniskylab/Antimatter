import {ButtonProps} from "antimatter/button";
import {IconName} from "antimatter/icon";
import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString} from "antimatter/validation";
import {IsOptional, ValidateIf} from "class-validator";

@ComponentName("Card Props")
export class CardComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateIf((cardProps: CardComponentProps) => !cardProps.thisIsPlaceholderCard)
    readonly icon?: IconName | string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: CardComponentProps) => !cardProps.thisIsPlaceholderCard)
    readonly name?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: CardComponentProps) => !cardProps.thisIsPlaceholderCard)
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
