import {IsEnum} from "@miniskylab/antimatter-framework";
import {AbstractTag} from "@miniskylab/antimatter-data-list";
import {IsOptional} from "class-validator";
import {TagMetadata, TagStatus} from "../enums";

/**
 * Represents a piece of information that describes the transaction records they are assigned to.
 */
export class Tag extends AbstractTag
{
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
