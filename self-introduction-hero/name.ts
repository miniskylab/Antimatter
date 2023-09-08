import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {SelfIntroductionHeroProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, SelfIntroductionHeroProps);
