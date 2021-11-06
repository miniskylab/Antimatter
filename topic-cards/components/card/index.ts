import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {CardComponent} from "./card-component";
import {CardComponentProps} from "./models/card-component-props";
import {CardExporter} from "./models/card-exporter";

export const CardComponentName = Decorator.getValue<string>(ComponentName, CardComponentProps);

export {CardComponent};
export {CardComponentProps};

export {CardVariant} from "./variants";
export type {CardExportProps as CardProps} from "./models/card-export-props";
export const Card = new CardExporter().export(CardComponent);
