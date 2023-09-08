import {useContext} from "react";
import {TopicCardGroupContext} from "../models";

export function useTopicCardGroupContext(): TopicCardGroupContext { return useContext(TopicCardGroupContext); }
