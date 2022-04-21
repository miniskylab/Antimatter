import {Spacer as SpacerComponent} from "@miniskylab/antimatter-spacer";
import {SpacerDeserializerCreator} from "./deserializer-creator";

export const Spacer = new SpacerDeserializerCreator().createFrom(SpacerComponent);
