import {IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";

export class WindData
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly speed: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly direction: "N" | "E" | "W" | "S";


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isHighlighted?: boolean;
}
