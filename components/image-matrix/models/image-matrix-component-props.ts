import {IsArray} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-component";
import {Image} from "@miniskylab/antimatter-models";
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
