import {TimeUnit} from "@miniskylab/antimatter/date-time";
import {IconName} from "@miniskylab/antimatter/icon";
import {ComponentName, ComponentProps, Image} from "@miniskylab/antimatter/infrastructures";
import {IsBoolean, IsDate, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter/validation";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {EventPosition} from "./event-position";

@ComponentName("Event")
export class EventComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(EventPosition)
    @IsOptional()
    readonly position?: EventPosition;


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
