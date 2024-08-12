import {AbstractTag} from "@miniskylab/antimatter-data-list";
import {IsEnum} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {TagMetadata, TagStatus} from "../enums";

export class Tag extends AbstractTag
{
    @IsEnum(TagStatus)
    @IsOptional()
    readonly status?: TagStatus;


    @IsEnum(TagMetadata, {each: true})
    @IsOptional()
    readonly metadata?: Set<TagMetadata>;
}
