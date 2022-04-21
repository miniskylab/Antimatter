import {Icon as IconComponent} from "@miniskylab/antimatter-icon";
import {IconDeserializerCreator} from "./deserializer-creator";

export const Icon = new IconDeserializerCreator().createFrom(IconComponent);
