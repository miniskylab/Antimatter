import {useContext} from "react";
import {HighlightedParagraphContext} from "../models";

export function useHighlightedParagraphContext(): HighlightedParagraphContext { return useContext(HighlightedParagraphContext); }
