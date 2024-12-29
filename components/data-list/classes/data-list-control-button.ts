import {type GestureResponderEventHandler, IsBoolean, IsDefined, IsEnum, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";

export class DataListControlButton
{
    @IsString()
    @IsDefined()
    readonly text: string;


    @IsEnum(DefaultIconSet)
    @IsDefined()
    readonly icon: DefaultIconSet;


    @IsBoolean()
    @IsOptional()
    readonly disabled?: boolean;


    readonly onPress?: GestureResponderEventHandler;
}
