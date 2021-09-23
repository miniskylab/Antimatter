import {Export} from "@miniskylab/antimatter/infrastructures";
import {TopicCardsVariant} from "../variants";
import {TopicCardsComponentProps} from "./topic-cards-component-props";

export type TopicCardsExportProps = Export<TopicCardsComponentProps, TopicCardsVariant>;
