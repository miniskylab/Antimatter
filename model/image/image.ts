import {IsDefined, IsString} from "@miniskylab/antimatter-class-validator";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {ImageUrl} from "./image-url";

export class Image
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsOptional()
    readonly altText?: string;

    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ImageUrl)
    readonly url: ImageUrl;
}
