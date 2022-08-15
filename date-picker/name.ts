import {Decorator} from "@miniskylab/antimatter-decorator";
import {ComponentName} from "@miniskylab/antimatter-model";
import {DatePickerProps} from "./model";

export const Name = Decorator.getValue<string>(ComponentName, DatePickerProps);
