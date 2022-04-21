import {Transition as TransitionComponent} from "@miniskylab/antimatter-transition";
import {TransitionDeserializerCreator} from "./deserializer-creator";

export const Transition = new TransitionDeserializerCreator().createFrom(TransitionComponent);
