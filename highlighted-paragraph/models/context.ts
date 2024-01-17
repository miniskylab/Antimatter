import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {HighlightedParagraphProps} from "./props";

export const HighlightedParagraphContext = createContext<HighlightedParagraphContext>(undefined);
export type HighlightedParagraphContext = ComponentContext<HighlightedParagraphProps>;
