import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {TimelineComponentProps} from "./models/timeline-component-props";
import {TimelineExporter} from "./models/timeline-exporter";
import {TimelineComponent} from "./timeline-component";

export const TimelineComponentName = Decorator.getValue<string>(ComponentName, TimelineComponentProps);

export {TimelineComponent};
export {TimelineComponentProps};

export {TimelineVariant} from "./variants";
export type {TimelineExportProps as TimelineProps} from "./models/timeline-export-props";
export const Timeline = new TimelineExporter().export(TimelineComponent);

export {EventPosition} from "./components/event";
