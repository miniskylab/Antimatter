import {ComponentName, Decorator} from "antimatter/infrastructures";
import {HighlightedParagraphComponent} from "./highlighted-paragraph-component";
import {HighlightedParagraphComponentProps} from "./models/highlighted-paragraph-component-props";
import {HighlightedParagraphExporter} from "./models/highlighted-paragraph-exporter";

export const HighlightedParagraphComponentName = Decorator.getValue(ComponentName, HighlightedParagraphComponentProps) as string;

export {HighlightedParagraphComponent};
export {HighlightedParagraphComponentProps};

export {HighlightedParagraphVariant} from "./variants";
export type {HighlightedParagraphExportProps as HighlightedParagraphProps} from "./models/highlighted-paragraph-export-props";
export const HighlightedParagraph = new HighlightedParagraphExporter().export(HighlightedParagraphComponent);
