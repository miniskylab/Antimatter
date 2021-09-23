import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructures";
import {EventComponent} from "./event-component";
import {EventComponentProps} from "./models/event-component-props";
import {EventExporter} from "./models/event-exporter";

export const EventComponentName = Decorator.getValue(ComponentName, EventComponentProps) as string;

export {EventComponent};
export {EventComponentProps};

export {EventVariant} from "./variants";
export {EventPosition} from "./models/event-position";
export type {EventExportProps as EventProps} from "./models/event-export-props";
export const Event = new EventExporter().export(EventComponent);
