import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {HighlightedParagraphProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, HighlightedParagraphProps);
