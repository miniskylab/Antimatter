import {IsBoolean, IsDate, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IconName} from "@miniskylab/antimatter-icon";
import {ComponentProps, Image} from "@miniskylab/antimatter-model";
import {TimeUnit} from "@miniskylab/antimatter-typescript";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Position} from "./position";

export class Props extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(Position)
    @IsOptional()
    readonly position?: Position;


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
    @ValidateNested()
    @IsOptional()
    @Type(() => Image)
    readonly image?: Image;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly description?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(IconName)
    @IsDefined()
    readonly icon: IconName;


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
