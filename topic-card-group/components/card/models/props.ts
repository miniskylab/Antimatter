import {ComponentProps, IsArray, IsBoolean, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "@miniskylab/antimatter-nav-button";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {CompositeIllustration, IconIllustration, Illustration, ImageIllustration} from "../types";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly declare style: Style;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly thisIsPlaceholderCard?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Illustration, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: "type",
            subTypes: [
                {name: "icon", value: IconIllustration},
                {name: "image", value: ImageIllustration}
            ]
        }
    })
    readonly illustration?: CompositeIllustration;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly description?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NavButtonProps)
    readonly ctas?: NavButtonProps[];
}
