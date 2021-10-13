import {ComponentName, ComponentProps, Image} from "@miniskylab/antimatter/infrastructure";
import {IsArray} from "@miniskylab/antimatter/validation";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";

@ComponentName("Image Matrix")
export class ImageMatrixComponentProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @ValidateNested()
    @IsArray()
    @IsOptional()
    @Type(() => Image)
    readonly images?: Image[];
}
