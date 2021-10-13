import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {TopicCardsComponentProps} from "./models/topic-cards-component-props";
import {TopicCardsExporter} from "./models/topic-cards-exporter";
import {TopicCardsComponent} from "./topic-cards-component";

export const TopicCardsComponentName = Decorator.getValue(ComponentName, TopicCardsComponentProps) as string;

export {TopicCardsComponent};
export {TopicCardsComponentProps};

export {TopicCardsVariant} from "./variants";
export type {TopicCardsExportProps as TopicCardsProps} from "./models/topic-cards-export-props";
export const TopicCards = new TopicCardsExporter().export(TopicCardsComponent);

export type {CardProps} from "./components/card";
export {Card, CardVariant} from "./components/card";
