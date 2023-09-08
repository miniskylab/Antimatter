import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {TopicCardGroupProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, TopicCardGroupProps);
