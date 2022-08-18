import {ButtonProps} from "@miniskylab/antimatter-button";
import {IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps, Image} from "@miniskylab/antimatter-model";
import {IsOptional, ValidateIf} from "class-validator";

export class CardProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateIf((cardProps: CardProps) => !cardProps.thisIsPlaceholderCard)
    readonly image: Image | string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: CardProps) => !cardProps.thisIsPlaceholderCard)
    readonly title: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @ValidateIf((cardProps: CardProps) => !cardProps.thisIsPlaceholderCard)
    readonly description: string;


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
    readonly ctaButtons?: Pick<ButtonProps, "icon" | "label" | "href" | "target" | "disabled">[];
}
