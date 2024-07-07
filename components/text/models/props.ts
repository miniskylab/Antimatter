import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsInteger,
    IsNumber,
    IsString,
    Min,
    type PointerEvents
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type TextStyle} from "./style";

@ComponentName("Text")
export class TextProps extends ComponentProps<TextStyle>
{
    /**
     * Specify the text to display.
     */
    @IsString()
    @IsOptional()
    readonly children?: string;


    /**
     * Set this option to ***false*** to prevent users from selecting or highlighting the text.
     */
    @IsBoolean()
    @IsOptional()
    readonly selectable?: boolean;


    /**
     * This option is used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the
     * total number of lines does not exceed this number. Setting this option to **0** will disable all line restrictions.
     */
    @Min(0)
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly numberOfLines?: number;


    /**
     * This option determines whether this component can be the target of pointer events.
     *
     * <p style="padding:0;margin:0">• `auto`: This component can be the target of pointer events.</p>
     * <p style="padding:0;margin:0">• `none`: This component is never the target of pointer events.</p>
     * <p style="padding:0;margin:0">• `box-none`: This component is never the target of pointer events but its subcomponents can be.</p>
     * <p>• `box-only`: This component can be the target of pointer events but its subcomponents cannot be.</p>
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;
}
