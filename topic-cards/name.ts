import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TopicCardsProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TopicCardsProps);
