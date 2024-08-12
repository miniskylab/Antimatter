import {
    ComponentProps,
    IsBoolean,
    IsDate,
    IsDefined,
    IsEmpty,
    IsEnum,
    IsNotEmpty,
    IsString,
    TimeUnit
} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {type ImageSourcePropType} from "react-native";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsEmpty()
    readonly index: number;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    @IsOptional()
    readonly image?: ImageSourcePropType;


    @IsString()
    @IsOptional()
    readonly description?: string;


    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsDate()
    @IsDefined()
    readonly startDate: Date;


    @IsDate()
    @IsOptional()
    readonly endDate?: Date;


    @IsBoolean()
    @IsOptional()
    readonly isOnGoing?: boolean;


    @IsString()
    @IsOptional()
    readonly location?: string;


    @IsEnum(TimeUnit)
    @IsOptional()
    readonly minimumTimeUnit?: TimeUnit;
}
