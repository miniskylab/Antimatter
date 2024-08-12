import {type TagBase} from "@miniskylab/antimatter-data-list";
import {TagMetadata, TagStatus} from "../enums";

export type Tag = TagBase & {
    readonly status?: TagStatus;
    readonly metadata?: Set<TagMetadata>;
}
