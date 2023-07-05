import {useContext} from "react";
import {TopicCardsContext} from "../model";

export function useTopicCardsContext(): TopicCardsContext { return useContext(TopicCardsContext); }
