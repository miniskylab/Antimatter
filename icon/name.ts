import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {IconProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, IconProps);
