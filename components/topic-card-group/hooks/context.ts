import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TopicCardGroupContext} from "../models";

export function useTopicCardGroupContext(): NonNullable<TopicCardGroupContext> { return useContextOrThrow(TopicCardGroupContext); }
