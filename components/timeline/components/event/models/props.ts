import {ComponentProps, IsBoolean, IsDate, IsDefined, IsEnum, IsNotEmpty, IsString, TimeUnit} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    /**
     * Specify the location of the event on the timeline.
     */
    readonly index: number;


    /**
     * Specify the text that will be used for identification of the event.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * Specify the image associated with the event.
     */
    @IsOptional()
    readonly image?: ImageSourcePropType;


    /**
     * Specify what happens during the event.
     */
    @IsString()
    @IsOptional()
    readonly description?: string;


    /**
     * Specify the icon associated with the event.
     *
     * @type DefaultIconSet
     */
    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    /**
     * Specify the date on which the event starts.
     */
    @IsDate()
    @IsDefined()
    readonly startDate: Date;


    /**
     * Specify the date on which the event ends.
     */
    @IsDate()
    @IsOptional()
    readonly endDate?: Date;


    /**
     * Set this option to ***true*** to specify that the event has not ended.
     */
    @IsBoolean()
    @IsOptional()
    readonly isOnGoing?: boolean;


    /**
     * Specify the location at which the event occurs.
     */
    @IsString()
    @IsOptional()
    readonly location?: string;


    /**
     * Specify how dates and times are displayed on the event.
     */
    @IsEnum(TimeUnit)
    @IsOptional()
    readonly minimumTimeUnit?: TimeUnit;
}
