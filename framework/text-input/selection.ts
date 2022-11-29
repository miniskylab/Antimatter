import {IsOptional} from "class-validator";
import {IsDefined, IsNumber} from "../class-validator";

export class Selection
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly start: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsOptional()
    readonly end?: number;
}
