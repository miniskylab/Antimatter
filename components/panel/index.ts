import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {PanelComponentProps} from "./models/panel-component-props";
import {PanelExporter} from "./models/panel-exporter";
import {PanelComponent} from "./panel-component";

export const PanelComponentName = Decorator.getValue<string>(ComponentName, PanelComponentProps);

export {PanelComponent};
export {PanelComponentProps};

export {PanelVariant} from "./variants";
export type {PanelExportProps as PanelProps} from "./models/panel-export-props";
export const Panel = new PanelExporter().export(PanelComponent);
