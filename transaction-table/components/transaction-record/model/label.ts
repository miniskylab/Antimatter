import {IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {LabelData} from "./label-data";

export class Label
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly selectionOptions?: Record<string, LabelData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString({each: true})
    @IsOptional()
    readonly selectedValues?: string[];
}
