import {Timeline as TimelineComponent} from "@miniskylab/antimatter-timeline";
import {TimelineDeserializerCreator} from "./deserializer-creator";

export const Timeline = new TimelineDeserializerCreator().createFrom(TimelineComponent);
export {Props} from "./model";
