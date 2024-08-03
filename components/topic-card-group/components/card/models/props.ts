import {ComponentProps, IsArray, IsBoolean, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "@miniskylab/antimatter-nav-button";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Set this option to ***true*** to hide everything inside the card.
     */
    @IsBoolean()
    @IsOptional()
    readonly isPlaceholderCard?: boolean;


    /**
     * Specify the content of the card.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly text?: string;


    /**
     * Specify the actions of the card.
     */
    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NavButtonProps)
    readonly ctas?: NavButtonProps[];
}
