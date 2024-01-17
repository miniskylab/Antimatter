import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {HighlightedParagraphContext} from "../models";

export function useHighlightedParagraphContext(): NonNullable<HighlightedParagraphContext>
{
    return useContextOrThrow(HighlightedParagraphContext);
}
