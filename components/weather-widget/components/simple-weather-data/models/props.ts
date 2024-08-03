import {ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {HighlightColor} from "../enums";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the icon associated with the simple weather data.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the text associated with the simple weather data.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    /**
     * Specify the text that clarifies or provides context to the title.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly subtitle: string;


    /**
     * Specify the highlight color associated with the simple weather data.
     *
     * @type HighlightColor
     */
    @IsEnum(HighlightColor)
    @IsOptional()
    readonly highlightColor?: HighlightColor;
}
