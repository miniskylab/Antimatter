import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {SelfIntroductionHeroProps} from "./model";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, SelfIntroductionHeroProps);
