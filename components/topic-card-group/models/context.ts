import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TopicCardGroupProps} from "./props";

export const TopicCardGroupContext = createContext<TopicCardGroupContext>(undefined);
export type TopicCardGroupContext = ComponentContext<TopicCardGroupProps>;
