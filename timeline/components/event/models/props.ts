import {ComponentProps, IsBoolean, IsDate, IsDefined, IsEnum, IsNotEmpty, IsString, TimeUnit} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {ImageSourcePropType} from "react-native";
import {Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly index: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly image?: ImageSourcePropType;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly description?: string;


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
    @IsDate()
    @IsDefined()
    readonly startDate: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly endDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly isOnGoing?: boolean;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly location?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(TimeUnit)
    @IsOptional()
    readonly minimumTimeUnit?: TimeUnit;
}
