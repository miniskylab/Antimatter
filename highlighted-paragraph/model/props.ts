import {ComponentName, ComponentProps, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {IsOptional} from "class-validator";
import {HighlightedParagraphStyle} from "./style";

@ComponentName("Highlighted Paragraph")
export class HighlightedParagraphProps extends ComponentProps<HighlightedParagraphStyle>
{
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
    @IsString()
    @IsOptional()
    readonly title?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly content?: string;
}
