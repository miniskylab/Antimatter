import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {SelfIntroductionHeroProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, SelfIntroductionHeroProps);
