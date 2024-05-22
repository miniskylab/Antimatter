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
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly children?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly selectable?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @Min(0)
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly numberOfLines?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly pointerEvents?: PointerEvents;
}
