import {IsDefined, IsEnum, IsNotEmpty, IsPositive, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {TagMetadata, TagStatus} from "../enums";

/**
 * Represents a piece of information that describes the reminder items they are assigned to.
 */
export class Tag
{
    /**
     * Specify the name of the tag.
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * Specify the icon associated with the tag.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * Specify the order of the tag.
     */
    @IsPositive()
    @IsOptional()
    readonly order?: number;


    /**
     * Specify the way the tag operates or behaves.
     *
     * @type TagStatus
     */
    @IsEnum(TagStatus)
    @IsOptional()
    readonly status?: TagStatus;


    /**
     * Specify the metadata of the tag.
     */
    @IsEnum(TagMetadata, {each: true})
    @IsOptional()
    readonly metadata?: Set<TagMetadata>;
}
