import {IsEnum, IsNotEmpty, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {Status} from "./status";

export class MenuItem
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Status
     */
    @IsEnum(Status)
    @IsOptional()
    readonly status?: Status;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly displayText?: string;
}
