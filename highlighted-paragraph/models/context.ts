import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {HighlightedParagraphProps} from "./props";

export const HighlightedParagraphContext = createContext<HighlightedParagraphContext>({});
export type HighlightedParagraphContext = ComponentContext<HighlightedParagraphProps>;
