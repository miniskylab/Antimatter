import {IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {type Row} from "../components";

export class SelectedRow
{
    @IsString()
    @IsDefined()
    readonly id: string;


    @IsOptional()
    readonly data: Row.Data;
}
