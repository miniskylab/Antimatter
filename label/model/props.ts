import {
    ComponentName,
    ComponentProps,
    IsBoolean,
    IsInteger,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
    PointerEvents
} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {LabelStyle} from "./style";

@ComponentName("Label")
export class LabelProps extends ComponentProps<LabelStyle>
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
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly pointerEvents?: PointerEvents;
}
