import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {Props} from "./models/props";

export const Name = Decorator.getValue<string>(ComponentName, Props);
