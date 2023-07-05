import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TopicCardsProps} from "./props";

export const TopicCardsContext = createContext<TopicCardsContext>({});
export type TopicCardsContext = ComponentContext<TopicCardsProps>;
