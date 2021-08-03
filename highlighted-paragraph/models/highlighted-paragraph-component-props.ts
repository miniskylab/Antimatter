import {IconName} from "antimatter/icon";
import {ComponentName, ComponentProps} from "antimatter/infrastructures";
import {IsEnum, IsString} from "antimatter/validation";
import {IsOptional} from "class-validator";

@ComponentName("Highlighted Paragraph")
export class HighlightedParagraphComponentProps extends ComponentProps
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
    readonly text?: string;
}
