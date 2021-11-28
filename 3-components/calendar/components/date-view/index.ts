import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {DateViewComponent} from "./date-view-component";
import {DateViewComponentProps} from "./models/date-view-component-props";
import {DateViewExporter} from "./models/date-view-exporter";

export const DateViewComponentName = Decorator.getValue<string>(ComponentName, DateViewComponentProps);

export {DateViewComponent};
export {DateViewComponentProps};

export {DateViewVariant} from "./variants";
export {getDateViewData} from "./helpers/date-view-data";
export type {DateViewExportProps as DateViewProps} from "./models/date-view-export-props";
export const DateView = new DateViewExporter().export(DateViewComponent);
