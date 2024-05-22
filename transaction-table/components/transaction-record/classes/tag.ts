import {IsDefined, IsEnum, IsNotEmpty, IsPositive, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {TagMetadata, TagStatus} from "../enums";

export class Tag
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsOptional()
    readonly order?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type TagStatus
     */
    @IsEnum(TagStatus)
    @IsOptional()
    readonly status?: TagStatus;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsEnum(TagMetadata, {each: true})
    @IsOptional()
    readonly metadata?: Set<TagMetadata>;
}
