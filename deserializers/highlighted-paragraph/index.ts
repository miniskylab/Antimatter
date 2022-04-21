import {HighlightedParagraph as HighlightedParagraphComponent} from "@miniskylab/antimatter-highlighted-paragraph";
import {HighlightedParagraphDeserializerCreator} from "./deserializer-creator";

export const HighlightedParagraph = new HighlightedParagraphDeserializerCreator().createFrom(HighlightedParagraphComponent);
