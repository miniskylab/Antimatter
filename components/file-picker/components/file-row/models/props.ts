import {ComponentProps, IsDefined, IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {IsOptional} from "class-validator";
import {Status} from "../enums";
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


    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;


    readonly onProcess?: () => Promise<void> | undefined;


    readonly onFulfill?: () => void;


    readonly onReject?: () => void;


    readonly onDelete?: () => void;
}
