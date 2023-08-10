import {useContext} from "react";
import {HighlightedParagraphContext} from "../model";

export function useHighlightedParagraphContext(): HighlightedParagraphContext { return useContext(HighlightedParagraphContext); }
