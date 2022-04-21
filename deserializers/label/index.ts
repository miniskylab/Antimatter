import {Label as LabelComponent} from "@miniskylab/antimatter-label";
import {LabelDeserializerCreator} from "./deserializer-creator";

export const Label = new LabelDeserializerCreator().createFrom(LabelComponent);
