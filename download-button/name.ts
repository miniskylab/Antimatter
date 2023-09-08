import {ComponentName as ComponentNameDecorator, Decorator} from "@miniskylab/antimatter-framework";
import {DownloadButtonProps} from "./models";

export const ComponentName = Decorator.getValue<string>(ComponentNameDecorator, DownloadButtonProps);
