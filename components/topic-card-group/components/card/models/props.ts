import {ComponentProps, IsArray, IsBoolean, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "@miniskylab/antimatter-nav-button";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsBoolean()
    @IsOptional()
    readonly isPlaceholderCard?: boolean;


    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly text?: string;


    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NavButtonProps)
    readonly ctas?: NavButtonProps[];
}
