import {ComponentProps, type GestureResponderEventHandler, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {ProcessingStatus} from "../enums";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    @IsEnum(DefaultIconSet)
    @IsOptional()
    readonly icon?: DefaultIconSet;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly title: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly subtitle: string;


    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly uri: string;


    @IsEnum(ProcessingStatus)
    @IsOptional()
    readonly processingStatus?: ProcessingStatus;


    readonly onDelete?: GestureResponderEventHandler;
}
